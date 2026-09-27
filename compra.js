const API_COMPRAS = "http://localhost:8082/ecommerce/compra";

async function formulario(event) {
    event.preventDefault();
    const form = event.target;
    const statusEl = document.querySelector("#formStatus");
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    statusEl.textContent = "Enviando...";
    try {
        const response = await fetch(API_COMPRAS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
        }
        const resultado = await response.json();
        console.log("Resposta da API: ", resultado);
        statusEl.textContent = resultado.mensagem || "Compra realizada com sucesso!";
        form.reset();
    } catch (error) {
        console.error("Falha no envio:", error);
        statusEl.textContent = "Erro ao enviar dados.";
    }
}
document.getElementById("apiCompras").addEventListener("submit", formulario);