import { defineView } from '.bot/defines/view';

export default defineView({
  content: 'Hello, {{name}}!',
  inlineKeyboard: [
    [
      {
        text: 'Кнопка 1',
        handler: () => {
          console.log(123);
        },
        isVisible: () => false
      },
      {
        text: 'Кнопка 2',
        handler: () => {
          console.log(321);
        }
      }
    ]
  ]
});
