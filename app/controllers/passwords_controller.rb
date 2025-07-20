class PasswordsController < ApplicationController
  before_action :authenticate_user!

  def index
    @passwords = current_user.passwords
  end

  # def new
  #   @password = Password.new
  # end

  # def create
  #   @password = current_user.passwords.build(password_params)
  #   if @password.save
  #     redirect_to passwords_path, notice: 'Password was successfully created.'
  #   else
  #     render :new
  #   end
  # end

  # private

  # def password_params
  #   params.require(:password).permit(:username, :password_digest)
  # end
end
