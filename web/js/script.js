const promptTextArea = document.getElementById("prompt-textarea");
const promptTextSend = document.getElementById("send-button");

function requestMessage(message) {
    const area = document.getElementById("area");

    const hora = new Date().getHours();
    const minute = new Date().getMinutes();
    const seconds = new Date().getSeconds();

    let requestDiv = document.createElement("div");
    requestDiv.setAttribute("class", "request right");

    let requestMessageP = document.createElement("p");
    requestMessageP.innerHTML = message;
    requestDiv.appendChild(requestMessageP);

    let requestMessageSpan = document.createElement("span");
    requestMessageSpan.setAttribute("class", "right");
    requestMessageSpan.innerHTML = `${hora}/${minute}/${seconds}`;
    requestMessageP.appendChild(requestMessageSpan);

    area.append(requestDiv);
}
function responseMessage(message) {
    const area = document.getElementById("area");

    const hora = new Date().getHours();
    const minute = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    let responseImg = document.createElement("img");
    responseImg.setAttribute("class", "avatar");
    responseImg.setAttribute(
        "src",
        "https://bootstraplogos.com/wp-content/uploads/edd/2018/08/logo-4.png"
    );

    let responseDiv = document.createElement("div");
    responseDiv.setAttribute("class", "response left");
    responseDiv.style.borderBlockColor = "green";

    let responseMessageP = document.createElement("p");
    responseMessageP.innerHTML = marked(message);
    responseDiv.appendChild(responseImg);
    responseDiv.appendChild(responseMessageP);

    let responseMessageSpan = document.createElement("span");
    responseMessageSpan.setAttribute("class", "right");
    responseMessageSpan.innerHTML = `${hora}/${minute}/${seconds}`;
    responseMessageP.appendChild(responseMessageSpan);

    area.append(responseDiv);
}

promptTextSend.addEventListener("click", async () => {
    let input = promptTextArea.value;
    requestMessage(input);

    let prompt = {
        message: input,
    };
    let URI = "http://localhost:3000/api/gpt/";
    async function postData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }
    postData(URI, prompt)
        .then((res) => {
            responseMessage(res.response);
        })
        .catch((err) => console.log(err));
    promptTextArea.value = "";
});

document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos el elemento #area
    const area = document.getElementById("area");
    const message =
        "\
# ¡Hola! Estoy aquí para ayudarte en lo que necesites.\n\
\n\
**Comandos disponibles:**\n\
1. `!ayuda`: Muestra este mensaje de ayuda.\n\
2. `!saludo`: Te respondo con un cordial saludo.\n\
3. `!informacion`: Te proporciono información útil.\n\
4. `!buscar [término]`: Realizo una búsqueda en línea del término especificado.\n\
\n\
**Cómo usar los comandos:**\n\
Para ejecutar un comando, simplemente escribe el prefijo `!` seguido del nombre del comando, por ejemplo: `!saludo`.\n\
Si tienes alguna pregunta o necesitas asistencia, solo escribe tu mensaje normal y con gusto te responderé.\n\
\n\
¡Estoy aquí para ayudarte en lo que necesites! 😊";

    responseMessage(message);
    area.scrollTop = area.scrollHeight;
});
