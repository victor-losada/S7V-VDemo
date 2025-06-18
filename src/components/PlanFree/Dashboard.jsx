import React from 'react'
import { useState } from "react"
import logo from '../../assets/img/Logo2.png'
import { Lock, Unlock, CheckCircle, MessageCircle, Crown, ChevronRight, Star } from "lucide-react"
const Dashboard = () => {
    const [showChat, setShowChat] = useState(false)

  // Datos de ejemplo para las lecciones
  const lessons = [
    { id: 1, title: "Introducción al Trading", completed: false, unlocked: true },
    { id: 2, title: "Análisis Técnico Básico", completed: false, unlocked: false },
    { id: 3, title: "Patrones de Velas", completed: false, unlocked: false },
    { id: 4, title: "Indicadores Principales", completed: false, unlocked: false },
    { id: 5, title: "Gestión de Riesgo", completed: false, unlocked: false },
    { id: 6, title: "Psicología del Trading", completed: false, unlocked: false },
    { id: 7, title: "Estrategias de Entrada", completed: false, unlocked: false },
    { id: 8, title: "Estrategias de Salida", completed: false, unlocked: false },
    { id: 9, title: "Trading con Tendencias", completed: false, unlocked: false },
    { id: 10, title: "Trading en Rangos", completed: false, unlocked: false },
   
  ]

  // Progreso del usuario
  const completedLessons = lessons.filter((lesson) => lesson.completed).length
  const progressPercentage = (completedLessons / lessons.length) * 100

  return (


    <>
    
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Fondo geométrico */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/geometric-pattern.png')] bg-repeat"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-yellow-600/30 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="" className='h-12 w-14' />
            {/* <h1 className="text-2xl font-bold text-yellow-500">S7V</h1> */}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-yellow-500">Plan Estándar</span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
              <span className="text-black font-bold">V</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Tu Progreso de Aprendizaje</h2>
          <p className="text-gray-400 mb-4">Completa las 25 lecciones para solicitar tu asesoría gratuita</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{completedLessons} de 25 lecciones completadas</span>
            <span>{progressPercentage.toFixed(0)}%</span>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                lesson.unlocked
                  ? "border border-yellow-500/50 bg-gradient-to-br from-black to-gray-900 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                  : "border border-gray-800 bg-gray-900/30 opacity-80"
              }`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        lesson.completed
                          ? "bg-green-500/20 text-green-500"
                          : lesson.unlocked
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-gray-800 text-gray-600"
                      }`}
                    >
                      {lesson.completed ? (
                        <CheckCircle size={18} />
                      ) : lesson.unlocked ? (
                        <Unlock size={18} />
                      ) : (
                        <Lock size={18} />
                      )}
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Lección {lesson.id}</span>
                      <h3 className={`font-medium ${lesson.unlocked ? "text-white" : "text-gray-500"}`}>
                        {lesson.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    {lesson.completed ? "Completado" : lesson.unlocked ? "Disponible" : "Bloqueado"}
                  </div>
                  <button
                    className={`flex items-center text-sm rounded-full px-3 py-1 ${
                      lesson.unlocked
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:shadow-lg transition-all"
                        : "bg-gray-800 text-gray-600 cursor-not-allowed"
                    }`}
                    disabled={!lesson.unlocked}
                  >
                    {lesson.unlocked ? "Comenzar" : "Bloqueado"}
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>

              {/* Overlay para lecciones bloqueadas */}
              {!lesson.unlocked && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="text-center p-4">
                    <Lock className="mx-auto mb-2 text-gray-500" size={24} />
                    <p className="text-gray-400 text-sm">Completa las lecciones anteriores para desbloquear</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Upgrade Banner */}
        <div className="rounded-xl overflow-hidden border border-yellow-600/30 bg-gradient-to-br from-gray-900 to-black mb-8">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-2">
                <Crown className="text-yellow-500 mr-2" size={10} />
                <h3 className="text-xl font-bold text-white">¡Desbloquea todo el contenido premium!</h3>
              </div>
              <p className="text-gray-400 mb-4">Accede a más de 25 lecciones avanzadas y tutorías personalizadas</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="text-yellow-500 mr-1" size={16} />
                  <span className="text-gray-300">Contenido exclusivo</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-yellow-500 mr-1" size={16} />
                  <span className="text-gray-300">Soporte prioritario</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="text-3xl font-bold text-white mb-2">
                €5.99<span className="text-sm text-gray-400">/mes</span>
              </div>
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium py-2 px-6 rounded-full hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all">
                Cambiar a Premium
              </button>
            </div>
          </div>
        </div>

        {/* Requisitos para asesoría */}
        <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Requisitos para Asesoría Gratuita</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full border border-yellow-500/50 flex items-center justify-center mr-3">
                <span className="text-yellow-500 text-xs">1</span>
              </div>
              <p className="text-gray-300">Completar las 10 lecciones del plan gratuito</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full border border-yellow-500/50 flex items-center justify-center mr-3">
                <span className="text-yellow-500 text-xs">2</span>
              </div>
              <p className="text-gray-300">Responder y visualizar cada clase</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full border border-yellow-500/50 flex items-center justify-center mr-3">
                <span className="text-yellow-500 text-xs">3</span>
              </div>
              <p className="text-gray-300">Agendar tu asesoría a través del formulario de contacto</p>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        {showChat && (
          <div className="absolute bottom-16 right-0 w-80 bg-gray-900 border border-yellow-600/30 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-black">Soporte S7V</h3>
                <button onClick={() => setShowChat(false)} className="text-black hover:text-gray-800">
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 h-80 overflow-y-auto bg-gray-900">
              <div className="bg-gray-800 rounded-lg p-3 mb-3 max-w-[80%]">
                <p className="text-sm">¡Hola! ¿En qué podemos ayudarte hoy?</p>
                <span className="text-xs text-gray-500 mt-1 block">Soporte S7V • Ahora</span>
              </div>
            </div>
            <div className="p-3 border-t border-gray-800 bg-gray-900">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-gray-800 border-none rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
                <button className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-3 rounded-r-lg">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Botón Premium Flotante */}
        <button className="absolute bottom-0 right-16 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-full p-3 shadow-lg hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all">
          <Crown size={24} />
        </button>

        {/* Botón Chat Flotante */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-full p-3 shadow-lg hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
    </>
  )
}

export default Dashboard