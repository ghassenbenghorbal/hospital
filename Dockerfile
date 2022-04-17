FROM php:7.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -yq nodejs build-essential
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

WORKDIR /app
COPY . /app
RUN npm install -g npm@8.5.5
RUN composer install --no-scripts
RUN npm install --ignore-scripts
RUN npm run prod

CMD php artisan serve --host=0.0.0.0 --port=80
EXPOSE 80