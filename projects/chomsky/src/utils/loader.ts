export class Loader {
  public load(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (e) {
            reject(`Parse Error: Invalid JSON`);
          }
        } else {
          reject(xhr.statusText);
        }
      };

      xhr.onerror = () => {
        reject('Network Error');
      };

      xhr.send();
    });
  }
}
