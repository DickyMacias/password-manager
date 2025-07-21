class PasswordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_password, except: [:index, :new, :create]

  def index
    # First get all the user's passwords
    passwords = current_user.passwords

    # If there's a search term, filter in memory
    if params[:search].present?
      search_term = params[:search].strip.downcase
      @passwords = passwords.select do |password|
        [password.website, password.service_url, password.username].compact.any? do |field|
          field.downcase.include?(search_term)
        end
      end
    else
      @passwords = passwords
    end

    # For AJAX requests, only render the results partial
    respond_to do |format|
      format.html
      format.turbo_stream { render turbo_stream: turbo_stream.replace("password_results", partial: "passwords/password_list") }
    end
  end

  def new
    @password = Password.new
  end

  def create
    # First create the Password
    @password = Password.new(password_params)
    @password.username = current_user.email if @password.username.blank?

    # Start a transaction to ensure everything is saved correctly
    Password.transaction do
      if @password.save
        # Now we create the association explicitly
        UserPassword.create!(user: current_user, password: @password)
        redirect_to passwords_path, notice: 'Password was successfully created.'
      else
        render :new, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end
    end
  end

  def show
    @password = current_user.passwords.find(params[:id])
    # Here you could add logic to show password details,
    # but for now, we simply redirect to the password list.
    redirect_to passwords_path, notice: 'Password details are not available.'
  end

  def edit
  end

  def update
    if @password.update(password_params)
      redirect_to passwords_path, notice: 'Password was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @password.destroy
    redirect_to passwords_path, notice: 'Password was successfully deleted.', status: :see_other
  end

  private

  def set_password
    @password = current_user.passwords.find(params[:id])
  end

  def password_params
    params.require(:password).permit(:username, :password_digest, :website, :service_url, :notes)
  end
end
