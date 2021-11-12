Run Jitsi-meet web app using development server

1. Clone the repo

	$ https://github.com/chandrachowdaiah/Jitsi.git

2. Install packages

	$ cd lib-jitsi-meet

	$ npm install

	#### create global symlink for lib-jitsi-meet package
	$ npm link

	$ cd ../jitsi-meet

	#### create symlink from the local node_modules folder to the global lib-jitsi-meet symlink
	$ npm link lib-jitsi-meet

	$ npm install

3. Start the development server and application can be accessed at https://localhost:8080

	$ cd jitsi-meet
	
	$ npm start
--------------------------------------------------------------------------------

Host Jitsi services using docker-compose


1. Build the react app and package it using below command. It will output a tar.bz2 file in source folder

	$ cd jitsi-meet

	$ make

	$ make source-package

2. Extract the packaged react app ( tar.bz2 file ) to web folder of docker-jitsi-meet directory

3. Copy the env.example file as .env file. Uncomment ENABLE_AUTH, ENABLE_GUESTS, AUTH_TYPE.

	$ cp env.example .env

4. Set strong passwords in the security section options of .env file by running the following bash script

	$ cd docker-jitsi-meet-stable-6433

	$ ./gen-passwords.sh


5. Build the docker image for jitsi web. ( Go to web folder of docker-jitsi-meet )

	$ cd docker-jitsi-meet-stable-6433/web

	$  docker build -t nslhub/web .

6.  Start the docker containers. Jitsi-meet can be accessed at https://localhost:8443.

	$ cd docker-jitsi-meet-stable-6433/web

	$ docker-compose up -d

7. Register a user with prosody and set username and password.

	// Access the container

	$ docker-compose exec prosody /bin/bash 

	// Register user in prosody

	prosodyctl --config /config/prosody.cfg.lua register support meet.nsldemo.com support	





