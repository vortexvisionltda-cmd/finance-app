async function registrar() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password }]);

  if (error) {
    alert("Erro ao registrar: " + error.message);
  } else {
    alert("Usuário registrado!");
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !data) {
    alert("Login inválido");
  } else {
    alert("Login realizado!");
    document.getElementById("auth").style.display = "none";
    document.getElementById("app").style.display = "block";
  }
}
