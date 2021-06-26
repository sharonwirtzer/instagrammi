import io from 'socket.io-client'

const baseUrl = (process.env.NODE_ENV === 'production')? '' : '//localhost:3000'
export const socketService = createSocketService()

window.socketService = socketService


function createSocketService() {
  var socket
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.off(eventName, cb).on(eventName, cb)
    },
    off(eventName, cb) {
      socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}



// Basic Tests
// function cb(x) {console.log(x)}
// socketService.on('baba', cb)
// socketService.emit('baba', 'DATA')
// socketService.off('baba', cb)
