ARG JITSI_REPO=jitsi
ARG BASE_TAG=latest
FROM ${JITSI_REPO}/base:${BASE_TAG}

#Added by vipin
#FROM debian:latest
#ENV DEBIAN_FRONTEND noninteractive
#ENV TERM xterm

ADD https://raw.githubusercontent.com/acmesh-official/acme.sh/2.8.8/acme.sh /opt
COPY rootfs/ /

#Added by vipin
#RUN apt-get update
#RUN apt-get -y install curl
#RUN apt install apt-transport-https
#RUN curl -k https://download.jitsi.org/jitsi-key.gpg.key |  sh -c 'gpg --dearmor > /usr/share/keyrings/jitsi-keyring.gpg'
#RUN echo 'deb [signed-by=/usr/share/keyrings/jitsi-keyring.gpg] https://download.jitsi.org stable/' | tee /etc/apt/sources.list.d/jitsi-stable.list > /dev/null



#RUN apt-dpkg-wrap apt-get update && \
 #   apt-dpkg-wrap apt-get install -y cron nginx-extras jitsi-meet-web socat && \
  #  apt-dpkg-wrap apt-get -d install -y jitsi-meet-web-config && \

RUN apt-get update && \
    apt-get install -y cron nginx-extras jitsi-meet-web socat && \
    apt-get -d install -y jitsi-meet-web-config && \    
    dpkg -x /var/cache/apt/archives/jitsi-meet-web-config*.deb /tmp/pkg && \
    mv /tmp/pkg/usr/share/jitsi-meet-web-config/config.js /defaults && \
    mv /usr/share/jitsi-meet/interface_config.js /defaults && \
    rm -f /etc/nginx/conf.d/default.conf && \
    apt-cleanup && \
    rm -rf /tmp/pkg /var/cache/apt



EXPOSE 80 443

#Added by vipin
#COPY css/ /usr/share/jitsi-meet
#COPY libs/ /usr/share/jitsi-
COPY jitsi-meet/ /usr/share/jitsi-meet
COPY jitsi-meet/interface_config.js /defaults/interface_config.js

VOLUME ["/config", "/usr/share/jitsi-meet/transcripts"]
