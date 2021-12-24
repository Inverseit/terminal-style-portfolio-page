const app = document.querySelector("#app");
let signing = false;

const commands = {
  about: {
    text: "Who are we and what are we doing?",
    action: () => {
      createText(
        "We are some people and we really want a linux lab at CMUQ!"
      );
    },
  },
  help: {
    text: "See all commands.",
    action: () => {
      for (const [key, { text }] of Object.entries(commands)) {
        createCode(key, text);
      }
    },
  },
  sign: {
    text: "Support our initiation - sign the petition by entering your email",
    action: () => {
      signing = true;
      createText("Please, enter your email:");
    },
  },
  stats: {
    text: "See how many people have signed the petition",
    action: async () => {
      createText("Fetching data from the server:");
      const res = await stats();
      createText(`${res} people have signed the petition`)
    },
  },
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

app.addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {
    await delay(150);
    getInputValue();

    removeInput();
    await delay(150);
    new_line();
  }
});

app.addEventListener("click", function (event) {
  const input = document.querySelector("input");
  input.focus();
});

async function open_terminal() {
  createText("Welcome");
  await delay(700);
  createText("Starting the server...");
  await delay(1500);
  createText("You can run several commands:");

  for (const [key, { text }] of Object.entries(commands)) {
    createCode(key, text);
  }

  await delay(500);
  new_line();
}

function new_line() {
  if (!signing){
    const p = document.createElement("p");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    p.setAttribute("class", "path");
    p.textContent = "# user";
    span1.textContent = " in";
    span2.textContent = " ~/linux_lab";
    p.appendChild(span1);
    p.appendChild(span2);
    app.appendChild(p);
  }
  const div = document.createElement("div");
  div.setAttribute("class", "type");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const input = document.createElement("input");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
}

function removeInput() {
  const div = document.querySelector(".type");
  app.removeChild(div);
}

async function getInputValue() {
  const value = document.querySelector("input").value;
  if (signing){
    createText(value);
    const {isSuccess, message} = await signByEmail(value);
    if (isSuccess){
      trueValue(message);
    } else{
      falseValue(message);
    }
    signing = false;
    return;
  }
  if (commands.hasOwnProperty(value)) {
    trueValue(value);
    commands[value].action();
  } else if (value === "clear") {
    document.querySelectorAll("p").forEach((e) => e.parentNode.removeChild(e));
    document
      .querySelectorAll("section")
      .forEach((e) => e.parentNode.removeChild(e));
  } else {
    falseValue(value);
    createText(`command not found: ${value}`);
  }
}

function trueValue(value) {
  const div = document.createElement("section");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess");
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function falseValue(value) {
  const div = document.createElement("section");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone error");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error");
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function createText(text, classname) {
  const p = document.createElement("p");

  p.innerHTML = text;
  app.appendChild(p);
}

function createCode(code, text) {
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML = `${code} <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
}

open_terminal();

const signByEmail = async (email) => {
  console.log(email);
  return {isSuccess: true, message: `Done, thanks ${email}!`}
}

const stats = async () => {
  return 10;
}