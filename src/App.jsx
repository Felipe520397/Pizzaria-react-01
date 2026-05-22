import React from 'react'
import './App.css'

function App() {

  const [cart, setCart] = React.useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  const [modalAberto, setModalAberto] = React.useState(false)

  const [form, setForm] = React.useState({
    nome: "",
    email: "",
    mensagem: ""
  })

  const [erros, setErros] = React.useState({})

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

  function adicionarPizza(pizza) {
    setCart([...cart, pizza])
  }

  function removerPizza(index) {
    const novoCarrinho = cart.filter((_, i) => i !== index)
    setCart(novoCarrinho)
  }

  const total = cart.reduce((acc, item) => acc + item.preco, 0)

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validarFormulario(e) {
    e.preventDefault()

    let errosTemp = {}

    if (!form.nome) {
      errosTemp.nome = "Nome obrigatório"
    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(form.nome)) {
      errosTemp.nome = "Nome inválido (sem números)"
    }

    if (!form.email) {
      errosTemp.email = "E-mail obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errosTemp.email = "E-mail inválido"
    }

    if (!form.mensagem) {
      errosTemp.mensagem = "Mensagem obrigatória"
    } else if (form.mensagem.length < 10) {
      errosTemp.mensagem = "Mínimo 10 caracteres"
    }

    setErros(errosTemp)

    if (Object.keys(errosTemp).length === 0) {
      alert("Mensagem enviada com sucesso!")
      setForm({ nome: "", email: "", mensagem: "" })
    }
  }

  return (
    <>
      <header>
        <h1>Pizzaria</h1>

        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </nav>
      </header>

      <main>

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

      {modalAberto && (
        <div className="modal">
          <div className="modal-box">

            <h2>Resumo do Pedido</h2>

            {cart.map((item, index) => (
              <p key={index}>
                {item.nome} - R$ {item.preco}
              </p>
            ))}

            <h2>Total: R$ {total}</h2>
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

      <section id="contato">
        <h2>Contato</h2>

        <form onSubmit={validarFormulario}>

          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
          />
          {erros.nome && <p>{erros.nome}</p>}

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {erros.email && <p>{erros.email}</p>}

          <textarea
            name="mensagem"
            placeholder="Mensagem"
            value={form.mensagem}
            onChange={handleChange}
          />
          {erros.mensagem && <p>{erros.mensagem}</p>}

          <button type="submit">Enviar</button>

        </form>
      </section>

      <footer>
        <p>© 2023 Pizzeria Felipe</p>
      </footer>
    </>
  )
}

export default App