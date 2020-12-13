import AuthUtil from '~/util/AuthUtil'

export default function (ctx) {
  console.log('in auth middleware')
  if(!AuthUtil.isUserLoggedIn()) {
    return ctx.redirect('/')
  }
}

