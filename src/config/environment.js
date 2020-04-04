const environment = {
    development: {
        API: {
            host: 'localhost',
            port: 8080
        },
        JWT: {
            secret: '2f3bbe6e4640aa73767be13b11ef4cae',
            expiration_days: 7
        }
    },

    staging: {
        API: {
            host: process.env.API_URL,
            port: process.env.API_PORT
        },
        JWT: {
            secret: process.env.JWT_SECRET,
            expiration_days: process.env.JWT_EXPIRATION_DAYS
        }
    },

    production: {
        API: {
            host: process.env.API_URL,
            port: process.env.API_PORT
        },
        JWT: {
            secret: process.env.JWT_SECRET,
            expiration_days: process.env.JWT_EXPIRATION_DAYS
        }
    }
}

module.exports = environment[process.env.NODE_ENV || 'development'];