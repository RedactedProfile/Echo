FROM debian:buster-slim

RUN apt-get update
RUN apt-get install curl unzip -y 

RUN curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.0.0

COPY echo.ts deps.ts lock.json README.md /app/build/
COPY src /app/build/src

WORKDIR /app/build

RUN /root/.deno/bin/deno bundle echo.ts /app/echo.bundle.js

WORKDIR /app 

RUN rm -rf /app/build

RUN ls -la /app

ENTRYPOINT ["/root/.deno/bin/deno", "run", "--allow-net", "--allow-env", "--reload", "./echo.bundle.js"]