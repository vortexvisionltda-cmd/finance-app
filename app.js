let user = null;

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password }])
    .select()
    .single();

  if (!error) {
    user = data;
    startApp();
  } else {
    alert("Erro ao registrar");
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (data) {
    user = data;
    startApp();
  } else {
    alert("Login inválido");
  }
}

function startApp() {
  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";
  loadTransactions();
}

async function addTransaction() {
  const type = document.getElementById("type").value;
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;

  await supabase.from("transactions").insert([{
    user_id: user.id,
    type,
    amount,
    description,
    date
  }]);

  loadTransactions();
}

async function loadTransactions() {
  const { data } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id);

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(t => {
    const li = document.createElement("li");
    li.innerText = `${t.type} - R$ ${t.amount} - ${t.description}`;
    list.appendChild(li);
  });
}
