import { boot } from 'quasar/wrappers'
import { Loading, Notify, QInput } from 'quasar'
import noop from 'lodash/noop'

export default boot(() => {
  Notify.setDefaults({
    type: 'positive',
    position: 'top',
    timeout: 3000,
    progress: true,
    actions: [{ icon: 'close', color: 'white', handler: noop }],
  })

  Loading.setDefaults({
    message: 'One moment...',
    // boxClass: 'bg-white text-grey-9', // missing option for set defaults?
    spinnerColor: 'white',
  })

  // based on: https://github.com/quasarframework/quasar/discussions/8761#discussioncomment-1042529
  // TODO: in the future perhaps there will be a more official way to do this.
  QInput.props.standout = {
    type: QInput.props.standout,
    default: true,
  }
  QInput.props.hideBottomSpace = {
    type: QInput.props.hideBottomSpace,
    default: true,
  }
})
