FROM postgres:latest

# Establece las variables de entorno para PostgreSQL
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=123456
ENV POSTGRES_DB=fareva_stock_control

# Exponer el puerto por defecto de PostgreSQL
EXPOSE 5432