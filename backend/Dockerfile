# Use the official PHP 7.4 image from Docker Hub
FROM php:7.4-apache

# Install some basic utilities and PHP extensions
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-install mysqli mbstring exif pcntl bcmath gd

# Clear out the local repository of retrieved package files
RUN apt-get clean

# Copy the application code to the container
ADD php/api /var/www/html/api
ADD php/config /var/www/html/config
ADD php/lib /var/www/html/lib

# Use the default production configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Change the ownership of the application code to be the www-data user (the user Apache runs as)
RUN chown -R www-data:www-data /var/www/html

# Expose port 80 for the app
EXPOSE 80

# Set the entrypoint to run the PHP backend
CMD ["apache2-foreground"]
