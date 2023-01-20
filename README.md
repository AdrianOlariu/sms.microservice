# sms.microservice

Application made with:
-backend: nodejs, express

-frontend: vanillajs served through the express app.

-hardware: gsm modem, raspbery pi

-os: linux, sms3, nginx, systemd services(sms_modem.service / sms_server.service)


A service for using sms as a mean o comunication. 
The application communicate with this microservice via HTTP Requests.

Web Server hosted on a Raspberry PI. 
Connected to the USB port, there is a GSM Modem witha SIM Card controlled by a NodeJS App that expose an API for sending SMS.

Usage:

The service is used via a POST HTTP REQUEST ON: 'http://sms.luxartem.ro/api?key=<apiKey>&phone=<phone>&message=<message>' AND expects a the API KEY, Phone Number and a Text Message and returns a response inside a JSON 'message' field of type(success: message sent, failed: message not sent)

Materails used for interacting with the modem through linux/raspberrypi:
https://sysopstechnix.com/build-your-own-sms-gateway-using-raspberry-pi/

AT Commands for sending commands to the modem:
https://m2msupport.net/m2msupport/sim-at-commands-for-sim-presense-and-status/

Other materials for error fixes/repair features:

-for installing the sms3 linux application fix: http://smstools3.kekekasvi.com/topic.php?id=1607
    modify in src/Makefile: 
    CFLAGS += -W -Wall
    to
    CFLAGS += -fcommon

-for converting the initialisation of the service from the old INIT.D to SYSTEMD
    -https://patchwork.ozlabs.org/project/buildroot/patch/142f0a6ba96f097f1fea57227786b9cf341aedca.1432332802.git.alex.suykov@gmail.com/
    -https://www.redhat.com/en/blog/converting-traditional-sysv-init-scripts-red-hat-enterprise-linux-7-systemd-unit-files

OBS.:
Change the sms3 config location paths inside /etc/smsd.conf for files, to sms.microservice/sms/
