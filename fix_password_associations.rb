# Este script crea las asociaciones faltantes entre usuarios y passwords
# Ejecútalo con: bin/rails runner fix_password_associations.rb

puts "Buscando passwords sin asociaciones..."
passwords = Password.left_outer_joins(:user_passwords).where(user_passwords: { id: nil })

if passwords.any?
  puts "Encontrados #{passwords.count} passwords sin asociaciones."

  # Asumiendo que quieres asociar todos estos passwords al primer usuario del sistema
  default_user = User.first

  if default_user
    puts "Asociando passwords al usuario: #{default_user.email}"

    passwords.each do |password|
      UserPassword.create!(user: default_user, password: password)
      puts "Asociado password ID #{password.id} con usuario ID #{default_user.id}"
    end

    puts "¡Completado! #{passwords.count} passwords ahora están asociados."
  else
    puts "Error: No se encontró ningún usuario en el sistema."
  end
else
  puts "No se encontraron passwords sin asociaciones. Todo está bien."
end
