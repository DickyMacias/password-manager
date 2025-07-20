class PasswordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_password, only: [:edit, :update, :destroy]

  def index
    @passwords = current_user.passwords
  end

  def new
    @password = Password.new
  end

  def create
    @password = current_user.passwords.build(password_params)

    if @password.save
      redirect_to passwords_path, notice: 'Password was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
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
