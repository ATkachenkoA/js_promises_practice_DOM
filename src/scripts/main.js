'use strict';

function addPromises() {
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  const firstPromise = new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);

    document.addEventListener(
      'mousedown',
      (e) => {
        if (e.button === 0) {
          clearTimeout(timerId);
          resolve('First promise was resolved');
        }
      },
      { once: true },
    );
  });

  const secondPromise = new Promise((resolve, reject) => {
    document.addEventListener(
      'mousedown',
      (e) => {
        if (e.button === 0 || e.button === 2) {
          resolve('Second promise was resolved');
        }
      },
      { once: true },
    );
  });

  const thirdPromise = new Promise((resolve, reject) => {
    let leftClicked = false;
    let rightClicked = false;

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    });
  });

  function handlerSuccess(message) {
    const div = document.createElement('div');

    div.className = 'success';
    div.textContent = message;
    div.setAttribute('data-qa', 'notification');

    document.body.appendChild(div);
  }

  function handlerError(error) {
    const div = document.createElement('div');

    div.className = 'error';
    div.textContent = error.message;
    div.setAttribute('data-qa', 'notification');

    document.body.appendChild(div);
  }

  firstPromise.then(handlerSuccess).catch(handlerError);
  secondPromise.then(handlerSuccess).catch(handlerError);
  thirdPromise.then(handlerSuccess).catch(handlerError);
}

addPromises();
