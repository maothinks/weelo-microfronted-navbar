import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import appSetting from '../appsettings.json'


export default function SignalRNotifier(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(appSetting.SignalREndPoint)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected!');

          connection.on('ReceiveMessage', (result: any) => {

            let user = JSON.parse(sessionStorage.getItem('user'));

            if (result.userId == user.id) {
              let finalMessage = "someone is viewing one of your properties [" + result.message + "]"
              enqueueSnackbar(finalMessage, { variant: 'warning' });
              props.notifyEvent(finalMessage);
            }
          });
        })
        .catch((e: any) => console.log('Connection failed: ', e));
    }
  }, [connection]);

  return (<></>);
}
