const controlTexto = document.getElementById('controlTexto'); // Variable para controlar el texto

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
  // Agrega un evento click al botón de voz
  document.getElementById('voice-btn').addEventListener('click', function() {
    // Inicializa el objeto de reconocimiento de voz
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES'; // Establece el idioma del reconocimiento de voz

    // Callback que se ejecuta cuando se detecta una transcripción de voz
    recognition.onresult = function(event) {
      // Obtiene la transcripción de voz
      const transcript = event.results[0][0].transcript.toLowerCase(); // Convierte el texto a minúsculas para facilitar la comparación

      // Palabras clave para cambiar el tamaño del texto
      const sizeKeywords = ['tamaño 1', 'tamaño 2', 'tamaño 3', 'tamaño 4', 'tamaño 5', 'tamaño 6'];

      // Itera sobre cada tamaño de texto posible
      for (let i = 1; i <= 6; i++) {
        // Verifica si la transcripción incluye la palabra clave correspondiente al tamaño
        if (transcript.includes(`tamaño ${i}`)) {
          // Elimina todas las clases de tamaño anteriores
          for (let j = 1; j <= 6; j++) {
            controlTexto.classList.remove(`fs-${j}`);
          }
          // Agrega la clase correspondiente al tamaño detectado
          controlTexto.classList.add(`fs-${i}`);
          console.log(`Se detectó la palabra clave: tamaño ${i}`); // Muestra un mensaje en la consola
          enviarOrdenA(mockApiUrl, `tamaño ${i}`); // Llama a la función para enviar la orden a MockAPI.io
          return; // Sal del bucle una vez que se ha encontrado una coincidencia
        }
      }

      // Palabras clave para controlar el navegador
      const browserKeywords = {
        'abrir pestaña': () => window.open('https://www.google.com/?hl=es', '_blank'),
        'ir a youtube': () => window.open('https://www.youtube.com', '_blank'),
        'ir a facebook': () => window.open('https://www.facebook.com', '_blank'),
        'ir a github': () => window.open('https://www.github.com', '_blank'),
        'maximizar ventana': () => window.resizeTo(screen.width, screen.height),
        'minimizar ventana': () => window.resizeTo(screen.width / 2, screen.height / 2), // Redimensionar al 50% del tamaño de la pantalla
        'cerrar pestaña': () => window.close(), // Cerrar la ventana actual
        'cerrar navegador': () => window.close()
      };

      // Itera sobre las palabras clave para controlar el navegador
      for (const keyword in browserKeywords) {
        if (transcript.includes(keyword)) {
          browserKeywords[keyword](); // Ejecuta la función asociada a la palabra clave
          console.log(`Se detectó la palabra clave: ${keyword}`);
          enviarOrdenA(mockApiUrl, keyword); // Llama a la función para enviar la orden a MockAPI.io
          return; // Sal del bucle una vez que se ha encontrado una coincidencia
        }
      }

      // Mensaje para comandos no reconocidos
      console.log('Comando no reconocido');
    };

    // Callback que se ejecuta cuando hay un error en el reconocimiento de voz
    recognition.onerror = function(event) {
      console.error('Error de reconocimiento de voz: ' + event.error); // Muestra un mensaje de error en la consola
    };

    // Inicia el reconocimiento de voz
    recognition.start();
  });
});

// Función para enviar la orden aceptada a MockAPI.io
function enviarOrdenA(url, comando) {
  // Datos de la orden aceptada
  const orden = {
    Comando: comando
  };

  // Configuración de la solicitud
  const opciones = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orden)
  };

  // Realizar la solicitud POST a MockAPI.io
  fetch(url, opciones)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar la orden a MockAPI.io');
      }
      return response.json();
    })
    .then(data => {
      console.log('Orden enviada correctamente a MockAPI.io:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// URL de tu recurso en MockAPI.io
const mockApiUrl = 'https://6605ef1dd92166b2e3c3035d.mockapi.io/Comandos';