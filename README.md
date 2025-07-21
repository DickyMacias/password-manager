# Password Manager

A secure, modern password manager built with Ruby on Rails 7 and Hotwire (Turbo + Stimulus). This application allows you to securely store and manage your passwords with an elegant, responsive interface powered by Tailwind CSS.

## Features

* **Secure Password Storage**: All passwords are encrypted using Rails' ActiveRecord Encryption
* **User Authentication**: Built with Devise for secure user management
* **Real-time Search**: Interactive password search with debounce functionality
* **Password Generator**: Built-in secure password generator with customizable options
* **Copy to Clipboard**: One-click copying of passwords to clipboard
* **Responsive Design**: Modern UI built with Tailwind CSS that works on all devices

## Technologies Used

* **Ruby on Rails 7.2+**: The core framework
* **PostgreSQL**: Database backend
* **Hotwire**: Turbo and Stimulus for interactive features
* **Tailwind CSS**: For styling
* **Devise**: For authentication
* **ActiveRecord Encryption**: For secure password storage

## Getting Started

### Prerequisites

* Ruby 3.2+ 
* PostgreSQL
* Node.js & Yarn

### Installation

1. Clone the repository
```
git clone https://github.com/DickyMacias/password-manager.git
cd password-manager
```

2. Install dependencies
```
bundle install
```

3. Configure your database in `.env` file
```
DATABASE_URL=postgresql://username:password@localhost:5432/password_manager
ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY=your_encryption_key
ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY=your_deterministic_key
ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT=your_key_derivation_salt
```

4. Setup the database
```
bin/rails db:create db:migrate
```

5. Start the server
```
bin/dev
```

## Usage

1. Register a new account
2. Add your passwords
3. Use the search functionality to quickly find passwords
4. Generate secure passwords directly within the app

## Inspiration and Credits

This project is inspired by the teachings and tutorials from [GoRails](https://gorails.com) by Chris Oliver. The implementation of Hotwire, Stimulus controllers, and many Rails best practices are based on his excellent educational content.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
