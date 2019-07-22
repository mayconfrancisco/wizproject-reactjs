import { connect } from 'react-redux';

function checkAuth({ roles, permissions }, checkRole, checkPermission) {
  if (checkRole && !roles.includes(checkRole)) {
    return false;
  }
  if (checkPermission && !permissions.includes(checkPermission)) {
    return false;
  }

  return true;
}

// Apenas esconde o componente - exibe ou nao
// const Can = ({
//   children, auth, checkRole, checkPermission,
// }) => checkAuth(auth, checkRole, checkPermission) && children;

// COm render props transformando o retorno em uma funcao e verificando,
// conseguimos passar parametros e verificar la no nosso componente se podemos
// dasabilitar (exibir mas nao permitir alteracoes) o compontente se nao tiver permissao
// verifique o select no Components/Members/index
const Can = ({
  children, auth, checkRole, checkPermission,
}) => (typeof children === 'function'
  ? children(checkAuth(auth, checkRole, checkPermission) && children)
  : checkAuth(auth, checkRole, checkPermission) && children);

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Can);
