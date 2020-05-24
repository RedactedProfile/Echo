FROM debian:buster-slim

RUN apt-get update
RUN apt-get install curl unzip -y 

RUN curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.0.0

COPY echo.ts deps.ts lock.json README.md /app/
COPY src /app/src

WORKDIR /app

RUN ls -la /app

ENTRYPOINT ["/root/.deno/bin/deno", "run", "--allow-net", "--allow-env", "--reload", "./echo.ts"]