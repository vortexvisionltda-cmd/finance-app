async function registrar() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase
    .from("users")
    .insert([
      { email: email, password: password }
    ]);

  if (error) {
    alert("Erro ao registrar: " + error.message);
    console.log(error);
  } else {
    alert("Usuário registrado com sucesso!");
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
    console.log(data);
  }
}
