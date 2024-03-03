# info de la materia: st0263 <nombre>
#
# Estudiante(s): Andres Camilo Alvarez Vasquez, acalvarezv@eafit.edu.co
#
# Profesor: Alvaro Ospina, aeospinas@eafit.edu.co
#
# <para borrar: EL OBJETIVO DE ESTA DOCUMENTACÍON ES QUE CUALQUIER LECTOR CON EL REPO, EN ESPECIAL EL PROFESOR, ENTIENDA EL ALCANCE DE LO DESARROLLADO Y QUE PUEDA REPRODUCIR SIN EL ESTUDIANTE EL AMBIENTE DE DESARROLLO Y EJECUTAR Y USAR LA APLICACIÓN SIN PROBLEMAS>

# <para borrar: renombre este archivo a README.md cuando lo vaya a usar en un caso específico>

# P2P - Comunicación entre procesos mediante API REST, RPC y MOM
#
# 1. Breve descripción de la actividad
#
<texto descriptivo>

## 1.1. Que aspectos cumplió o desarrolló de la actividad propuesta por el profesor (requerimientos funcionales y no funcionales)
Se desarrollo un sistema orientado a una red P2P. Donde se cumplio con los requerimientos funcionales y no funcionales propuestos por el profesor. Se implemento un servidor tracker que sirve como punto de consulta para conocer la ubicacion de los demas peer y tienes servicios como de login, logout de los peers y indexacion de los archivos de cada peer. Por otro lado se implemento un peer que se encarga de conectarse al tracker y compartir su ubicacion para que los demas peers puedan conectarse a el, ademas enviar el nombre de todos los archivos que contiene en el metodo de indexacion del tracker. Ademas se hizo el uso de docker para integrar y simular una red P2P con multiples peers y un tracker. 

## 1.2. Que aspectos NO cumplió o desarrolló de la actividad propuesta por el profesor (requerimientos funcionales y no funcionales)
Se cumplio de manera existosa con todos los requerimientos propuestos por el profesor en conversaciones tenidas en clase y en el enunciado de la actividad.

# 2. Información general de diseño de alto nivel, arquitectura, patrones, mejores prácticas utilizadas.


Se utilizo una arquitectura P2P, donde el servidor es el tracker y los clientes son los peers. El tracker se encarga de recibir las peticiones de los peers y responderlas con la informacion necesaria para que los peers puedan conectarse entre si. Sin embargo se debe tener en cuenta que los peers se pueden comportar como servidores y clientes al mismo tiempo, ya que pueden recibir peticiones de otros peers y a la vez enviar peticiones a otros peers.

![Diagrama Arquitectura P2P](./images/arquitectura-p2p-telematica.png)

Cabe aclarar que los peers estan en la capacidad de conectarse a cualquier otro peer de la red. En el diagrama se obvia este detalle para no ensuciar el diagrama con tantas flechas.


Adicionalmente se agrega los servicios expuestos de cada uno de los componentes de la arquitectura.
![Servicios de los componentes P2P](./images/p2p-services-telematica.png)

Atraves del contrato definido con gRPC el tracker expone los metodos de login, logout, buscada de archivos y indexacion de archivos. Por otro lado el hace peer uso del contrato para consusmir los metodos y hacer el papel de cliente. 

El codigo tambien esta estructurado de manera que se pueda hacer uso de docker para simular una red P2P con multiples peers y un tracker. Ademas dentro del peer y tracker se tiene una estructura parecida a la de un proyecto de node.js, con el fin de que sea mas facil de entender y de mantener. Se tiene los controladores, repositorios, rutas y inicializacion del servidor.

# 3. Descripción del ambiente de desarrollo y técnico: lenguaje de programación, librerias, paquetes, etc, con sus numeros de versiones.

El lenguaje de programación utilizado fue Node.js, se utilizo el framework express para el desarrollo del servidor y el cliente peer. Ademas se utilizo el paquete grpc para la comunicacion entre el tracker y los peers. El servidor del tracker se creo haciendo uso de la libreria de GRPC y el cliente peer se creo haciendo uso de la libreria de GRPC y express, dado que el peer debe tener un servidor http para recibir las peticiones de los demas peers.

## Como se compila y ejecuta.


## Detalles del desarrollo.
A nivel del desarrollo al principio se tuvieron problemas con el desarrollo de la arquitectura propuesta dado a la carencia de conocimiento para la implementacion de algunos conceptos como lo es el gRPC, por lo cual se tuvo que hacer una investigacion previa para poder entender como se podia implementar el contrato de comunicacion entre el tracker y los peers. Ademas se tuvo que hacer una investigacion previa para entender como se podia hacer uso de docker para simular una red P2P con multiples peers y un tracker.

A nivel de codigo se implemento un fake repository para simular la base de archivos de cada peer, en donde cada peer genera un conjunto de nombres de archivos de manera aleatoria con el fin de hacer una mejor simulacion del comportamiento de un peer en la red P2P. 

Tambien al peer y tracker se le implemento un sistema de loguer con el fin de poder dar trazabilidad da los eventos y ver de manera mas clara el comportamiento de los componentes. 


Las funcionalidades del tracker y el peer se implementaron de manera secuencial, primero se implemento el tracker y luego el peer. Se opto por esta estrategia dado que el tracker es el punto central de la red P2P y es el que se encarga de informar a un peer la ubicacion de los demas peers, por lo cual se opto por implementar primero el tracker y luego el peer.

Cuando ya se tuvo el tracker creado se procedio hacer las prubas del mismo y luego se procedio con la creacion del peer. Se opto por esta estrategia dado que el peer es el que se encarga de conectarse al tracker y compartir su ubicacion para que los demas peers puedan conectarse a el.

Por ultimo cuando ya se probo todo el sistema se procedio a hacer la integracion de docker para simular una red P2P con multiples peers y un tracker. Se opto por esta estrategia dado que se queria simular una red P2P con multiples peers y un tracker y se queria hacer uso de docker para hacer la simulacion de la red P2P.


## Detalles técnicos
Dentro de la solucion planteada se opto por el uso de Node.Js dado que es un lenguaje de programacion que se puede usar para el desarrollo de aplicaciones de red escalables, trabaja bien para procesos concurrentes como se pide en la actividad. Ademas se opto por el uso de GRPC dado que es un framework de comunicacion de alto rendimiento que permite la comunicacion entre diferentes lenguajes de programacion.
Para la comunicacion entre el tracker y los peers se uso el protocolo de GRPC, el cual es un protocolo de comunicacion de alto rendimiento que permite la comunicacion entre diferentes lenguajes de programacion. Ademas se uso el protocolo de HTTP para la comunicacion entre los peers, dado que es un protocolo que se puede usar para la comunicacion entre diferentes lenguajes de programacion y es ampliamente usado en el desarrollo de aplicaciones web.

Tambien se hizo uso de express para el desarrollo del servidor y el cliente peer, dado que es un framework de node.js que se puede usar para el desarrollo de aplicaciones web y es ampliamente usado.

Dentro del tracker opte por el uso de la libreria UUID para la generacion de los id de los peers, dado que es una libreria que se puede usar para la generacion de id unicos.

Por ultimo se uso docker para la simulacion de la red P2P con multiples peers y un tracker, dado que es una herramienta que se puede usar para la creacion de contenedores.


## Descripción y como se configura los parámetros del proyecto (ej: ip, puertos, conexión a bases de datos, variables de ambiente, parámetros, etc)

A nivel de base de datos no se tiene una conexion con base de datos como tal, los archivos que se indexan en el tracker son guardados en memoria, por lo cual no se tiene que configurar ninguna conexion a base de datos. Ademas los archivos de cada peer son mockeados y generados en tiempo de ejecucion. 
Por otro lado, gracias al uso de docker compose se puede configurar el puerto de cada uno de los servicios, el cual se puede configurar en el archivo docker-compose.yml. Ademas se puede configurar el numero de peers que se quieren simular en la red P2P, el cual se puede configurar en el archivo docker-compose.yml. Siendo este archivo el punto central para la configuracion de la red P2P.

## opcional - detalles de la organización del código por carpetas o descripción de algún archivo. (ESTRUCTURA DE DIRECTORIOS Y ARCHIVOS IMPORTANTE DEL PROYECTO, comando 'tree' de linux)




## opcionalmente - si quiere mostrar resultados o pantallazos 


# 5. otra información que considere relevante para esta actividad.

# referencias:
<debemos siempre reconocer los créditos de partes del código que reutilizaremos, así como referencias a youtube, o referencias bibliográficas utilizadas para desarrollar el proyecto o la actividad>

## url de donde tomo info para desarrollar este proyecto
* https://blog.logrocket.com/creating-a-crud-api-with-node-express-and-grpc/
* https://blog.logrocket.com/communicating-between-node-js-microservices-with-grpc/
* https://grpc.io/docs/languages/node/basics/