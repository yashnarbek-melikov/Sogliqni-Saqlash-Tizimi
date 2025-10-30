export const formatTashkentTime = date => {
   return new Date(date).toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });
};

export const formatModel = model => {
   const formatted = { ...model };

   for (const key in model) {
      if (
         key.endsWith('_at') || // created_at, updated_at
         key.endsWith('_time') // appoint_time, start_time, end_time
      ) {
         if (model[key]) {
            formatted[key] = formatTashkentTime(model[key]);
         }
      }
   }

   return formatted;
};
