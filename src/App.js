import FormAssociarColunas from "./AssociarColunas/formAssociarColunas/index.js";
import ExibirAssociarColunas from "./AssociarColunas/exibirAssociarColunas/index.js";
import FormMarcarLacuna from "./MarcarLacuna/formMarcarLacuna/index.js";
import ExibirMarcarLacuna from "./MarcarLacuna/exibirMarcarLacuna/index.js";
import FormDigitarLacuna from "./DigitarLacuna/formDigitarLacuna/index.js";
import ExibirDigitarLacuna from "./DigitarLacuna/exibirDigitarLacuna/index.js";
import splashScreen from "./splashScreen/index.js";
import Login from "./login/login.js";
import FormDigitarPalavra from "./DigitarPalavra/formDigitarPalavra/index.js";
import ExibirDigitarPalavra from "./DigitarPalavra/exibirDigitarPalavra/index.js";
import FormAlternativaVideo from "./AlternativaCorreta/formAlternativaCorreta/index.js";
import ExibirAlternativaVideo from "./AlternativaCorreta/exibirAlternativaCorreta/index.js";
import FormAlternativaFrase from "./AlternativaFrase/formAlternativaFrase/index.js";
import ExibirAlternativaFrase from "./AlternativaFrase/exibirAlternativaFrase/index.js";
import FormOrdenarFrase from "./OrdenarFrase/formOrdenarFrase/index.js";
import ExibirOrdenarFrase from "./OrdenarFrase/exibirOrdenarFrase/index.js";
import PaginaCategorias from "./paginaCategorias/index.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./footer";

function App() {
  return (
    <div id="pag">
      <Router>
       <Switch>
          <Route path="/login">
            <Login/>
</Route>
          
          <Route
            path="/FormAssociarColunas"
            component={FormAssociarColunas}
          ></Route>
          <Route
            path="/FormMarcarLacuna"
            exact
            strict
            component={FormMarcarLacuna}
          ></Route>
          <Route
            path="/FormDigitarLacuna"
            exact
            strict
            component={FormDigitarLacuna}
          ></Route>
          <Route
            path="/FormDigitarPalavra"
            exact
            strict
            component={FormDigitarPalavra}
          ></Route>
          <Route
            path="/FormOrdenarFrase"
            exact
            strict
            component={FormOrdenarFrase}
          ></Route>
          <Route
            path="/FormAlternativaCorreta"
            exact
            strict
            component={FormAlternativaVideo}
          ></Route>
          <Route
            path="/FormAlternativaFrase"
            exact
            strict
            component={FormAlternativaFrase}
          ></Route>
          <Route path="/ExibirAssociarColunas"
            component={ExibirAssociarColunas}
          ></Route>
          <Route
            path="/ExibirMarcarLacuna"
            exact
            strict
            component={ExibirMarcarLacuna}
          ></Route>
          <Route
            path="/ExibirDigitarLacuna"
            exact
            strict
            component={ExibirDigitarLacuna}
          ></Route>
          <Route
            path="/ExibirDigitarPalavra"
            exact
            strict
            component={ExibirDigitarPalavra}
          ></Route>
          <Route
            path="/ExibirOrdenarFrase"
            exact
            strict
            component={ExibirOrdenarFrase}
          ></Route>
          <Route
            path="/ExibirAlternativaCorreta"
            exact
            strict
            component={ExibirAlternativaVideo}
          ></Route>
          <Route
            path="/ExibirAlternativaFrase"
            exact
            strict
            component={ExibirAlternativaFrase}
          ></Route>
           <Route
            path="/categorias"
            exact
            strict
            component={PaginaCategorias}
          ></Route>
          <Route path="/" component={splashScreen}></Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
