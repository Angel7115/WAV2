const controlTexto = document.getElementById('controlTexto'); // variable para controlar el texto

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
      const transcript = event.results[0][0].transcript;
      document.getElementById('result-container').textContent = transcript; // Muestra la transcripción en un contenedor

// ************************** SECCION RECONOCIMIENTO TAMAÑO *******************************
// ****************************************************************************************

      // Define las palabras clave para los diferentes tamaños de texto
      const keywords = ['tamaño 1', 'tamaño 2', 'tamaño 3', 'tamaño 4', 'tamaño 5', 'tamaño 6'];

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
          break; // Sal del bucle una vez que se ha encontrado una coincidencia
        }
      }
    };

// ************************** SECCION instrucciones navegador  ********************************
// ****************************************************************************************



    // Callback que se ejecuta cuando hay un error en el reconocimiento de voz
    recognition.onerror = function(event) {
      console.error('Error de reconocimiento de voz: ' + event.error); // Muestra un mensaje de error en la consola
    };

    // Inicia el reconocimiento de voz
    recognition.start();
  });
});
