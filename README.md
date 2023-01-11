# sms.microservice

A service for using sms as a mean o comunication. The application communicate with this microservice via HTTP Requests.

Web Server hosted on a Raspberry PI. 
Connected to the USB port, there is a GSM Modem witha SIM Card controlled by a NodeJS App that expose an API for sending SMS.

Usage:

The service is used via a POST HTTP REQUEST ON: http://sms.luxartem.ro/sms AND expects a Phone Number and a Text Message inside of a JSON 
ex. {phone:phoneNumber, text:textMessage}