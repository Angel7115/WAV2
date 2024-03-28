const controlTexto = document.getElementById('controlTexto'); // variable para controlar el texto

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('voice-btn').addEventListener('click', function() { //funcion del boton
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById('result-container').textContent = transcript;

      //----------------------------------------------
      // KEYWORDS TAMAÑO
      const keyword1= 'tamaño 1';
      const keyword2='tamaño 2';
      const keyword3='tamaño 3'

      //KEYWORDS 

      transcript.includes(keyword1) ? 'is' : 'is not'

      if (transcript.includes(keyword1)) {
        controlTexto.classList.remove('fs-2'); // Eliminar clase anterior si existe
        controlTexto.classList.add('fs-1');
        console.log("Se detectó la palabra clave:", transcript);
      } //FIN IF KEY1
      
      if (transcript.includes(keyword2)) {
        controlTexto.classList.remove('fs-3'); // Eliminar clase anterior si existe
        controlTexto.classList.add('fs-2');
        console.log("Se detectó la palabra clave:", transcript);
      }//FIN IF KEY2



      //-------------------------------
console.log(transcript); //en la variable transcript se almacena aqui lo detectado
};

    recognition.onerror = function(event) { //Evento de Error
      console.error('Error de reconocimiento de voz: ' + event.error);
    };

    recognition.start();
  });
});
