class PasswordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_password, except: [:index, :new, :create]

  def index
    @passwords = current_user.passwords
  end

  def new
    @password = Password.new
  end

  def create
    # Primero creamos el Password
    @password = Password.new(password_params)
    @password.username = current_user.email if @password.username.blank?

    # Iniciamos una transacción para asegurar que todo se guarde correctamente
    Password.transaction do
      if @password.save
        # Ahora creamos la asociación explícitamente
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
    # Aquí podrías agregar lógica para mostrar detalles de la contraseña
    # pero por ahora, simplemente redirigimos a la lista de contraseñas.
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
