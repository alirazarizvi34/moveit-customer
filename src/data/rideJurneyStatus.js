export default rideJurneyHandler = language => {
  return (abc = [
    {
      manually_assigned:
        language === 'urdu' ? 'Driver Assigned' : 'Driver Assigned',
      scheduled: language === 'urdu' ? 'طے شدہ' : 'Scheduled',
      null: language === 'urdu' ? 'موورز کی تلاش' : 'Searching for movers',
      pending: language === 'urdu' ? 'موورز کی تلاش' : 'Searching for movers',
      reached: language === 'urdu' ? 'موور پہنچ گیا ہے' : 'Mover has reached',
      offloaded: language === 'urdu' ? 'آف لوڈنگ مکمل' : 'Off-loading Complete',
      finalised: language === 'urdu' ? 'رسید تیار ہے' : 'Invoice is ready',
      delivered:
        language === 'urdu'
          ? 'آپ کا اقدام مکمل ہو گیا ہے'
          : 'Your move has been completed',
      completed: language === 'urdu' ? 'مکمل' : 'Completed',
      fulfilled: language === 'urdu' ? 'مکمل' : 'Completed',
    },
  ]);
};
