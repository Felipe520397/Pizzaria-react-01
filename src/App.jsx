import React from 'react'
import './App.css'

function App() {

  // 🛒 CARRINHO COM LOCALSTORAGE
  const [cart, setCart] = React.useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  // 🪟 MODAL
  const [modalAberto, setModalAberto] = React.useState(false)

  // 📩 FORMULÁRIO
  const [nome, setNome] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [mensagem, setMensagem] = React.useState("")
  const [erros, setErros] = React.useState({})

  // 🍕 PIZZAS
  const pizzas = [
    {
      id: 1,
      nome: "Pizza Calabresa",
      descricao: "Pizza com calabresa, cebola e queijo.",
      imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000",
      preco: 40
    },
    {
      id: 2,
      nome: "Pizza Frango",
      descricao: "Pizza de frango com catupiry.",
      imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000",
      preco: 45
    },
    {
      id: 3,
      nome: "Pizza Portuguesa",
      descricao: "Pizza com presunto, ovo e queijo.",
      imagem: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1000",
      preco: 50
    }
  ]

  // ➕ ADICIONAR
  function adicionarPizza(pizza) {
    setCart([...cart, pizza])
  }

  // ❌ REMOVER
  function removerPizza(index) {
    const novoCarrinho = cart.filter((_, i) => i !== index)
    setCart(novoCarrinho)
  }

  // 🧮 TOTAL
  const total = cart.reduce((acc, item) => acc + item.preco, 0)

  // 💾 LOCALSTORAGE SALVAR
  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // 📩 VALIDAR FORMULÁRIO
  function validarFormulario(e) {
    e.preventDefault()

    let errosTemp = {}

    if (!nome) errosTemp.nome = "Nome obrigatório"

    if (!email) {
      errosTemp.email = "E-mail obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errosTemp.email = "E-mail inválido"
    }

    if (!mensagem) {
      errosTemp.mensagem = "Mensagem obrigatória"
    } else if (mensagem.length < 10) {
      errosTemp.mensagem = "Mínimo 10 caracteres"
    }

    setErros(errosTemp)

    if (Object.keys(errosTemp).length === 0) {
      alert("Mensagem enviada com sucesso!")
      setNome("")
      setEmail("")
      setMensagem("")
    }
  }

  return (
    <>
      {/* HEADER */}
      <header>
        <h1>Pizzaria</h1>

        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </nav>
      </header>

      {/* MAIN */}
      <main>

        {/* MENU */}
        <section>
          <h2>Menu</h2>

          {pizzas.map((pizza) => (
            <article key={pizza.id}>
              <h3>{pizza.nome}</h3>
              <img src={pizza.imagem} alt={pizza.nome} />
              <p>{pizza.descricao}</p>
              <p>R$ {pizza.preco}</p>

              <button onClick={() => adicionarPizza(pizza)}>
                Order
              </button>
            </article>
          ))}
        </section>

        {/* CARRINHO */}
        <section>
          <h2>Carrinho</h2>

          {cart.length === 0 ? (
            <p>Carrinho vazio</p>
          ) : (
            cart.map((item, index) => (
              <article key={index}>
                <h3>{item.nome}</h3>
                <p>R$ {item.preco}</p>

                <button onClick={() => removerPizza(index)}>
                  Remover
                </button>
              </article>
            ))
          )}

          <h2>Total: R$ {total}</h2>

          <button onClick={() => setModalAberto(true)}>
            Finalizar Pedido
          </button>
        </section>

      </main>

      {/* MODAL */}
      {modalAberto && (
        <div className="modal">
          <div className="modal-box">

            <h2>Resumo do Pedido</h2>

            {cart.map((item, index) => (
              <p key={index}>
                {item.nome} - R$ {item.preco}
              </p>
            ))}

            <h3>Total: R$ {total}</h3>
            <p>Quantidade: {cart.length}</p>

            <button onClick={() => {
              alert("Pedido confirmado!")
              setModalAberto(false)
            }}>
              Confirmar
            </button>

            <button onClick={() => setModalAberto(false)}>
              Fechar
            </button>

          </div>
        </div>
      )}

      {/* CONTATO */}
      <section>
        <h2>Contato</h2>

        <form onSubmit={validarFormulario}>

          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          {erros.nome && <p>{erros.nome}</p>}

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {erros.email && <p>{erros.email}</p>}

          <textarea
            placeholder="Mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
          {erros.mensagem && <p>{erros.mensagem}</p>}

          <button type="submit">Enviar</button>

        </form>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2023 Pizzeria Name</p>
      </footer>
    </>
  )
}

export default App