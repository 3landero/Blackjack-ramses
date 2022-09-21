
(()=>{                  //----PATRON MODULO
    'use strict'


        //-- PRIMERO SE CREA EL ARRAY DECK 
        //--2DO SE DETERMINAN LOS TIPOS DE CARTAS ( CLUB, DIAMOND, HEART, SPADES)
        //--3ERO LAS CARTAS QUE NO SON NUMEROS

        let deck         = []
        const tipos      = ['C','S','D','H'],
              especiales = ['A','Q','K','J'];


        let puntosjugadores = [];
        //--Referencias del HTML

        const btnPedir         = document.querySelector('#btnPedir'),
              puntosHTML       = document.querySelectorAll( 'small'),
              divCartasJugador = document.querySelectorAll('.divCartas');
              
        const btnDetener       = document.querySelector('#btnDetener'),
              btnNuevo         = document.querySelector('#btnNuevo');   
        
       //- esta funcion inicializa el juego
        const igniteGame=(numjugadores= 2 )=>{
              deck = crearDeck();
              puntosjugadores =[];
              for(let i = 0; i<numjugadores; i++ ){
                  puntosjugadores.push(0);
                }
                
                puntosHTML.forEach(elem => elem.innerText = 0);
                divCartasJugador.forEach(elem => elem.innerText = '');
                };  

        //--funcion que crea un nuevo deck y revuelve
        const crearDeck =()=>{
            deck = [];
            for(let i=2; i<= 10; i++) {
                for(let tipo of tipos){
                    deck.push(i+tipo)
                };
            };
                for(let tipo of tipos){
                    for(let especial of especiales)
                    deck.push(especial + tipo);
                };
                
                return _.shuffle(deck);
                
            };

        //-- Turno : 0 seradel jugador y 1 sera de la computadora
        const acumularPuntos =(carta,turno)=>{
            puntosjugadores[turno] = puntosjugadores[turno] + valorCarta ( carta ); 
            puntosHTML[turno].innerHTML = puntosjugadores[turno]; 
            return puntosjugadores[turno];
        }

        //--esta funcion roba la 1ra carta

        const pedirCarta =()=>{
        if (deck.length === 0 ){
            throw  'No hay mas cartas en el deck';
        }
             
            return deck.pop();
        }


        //--ESTA FUNCION ARROJA EL VALOR NUMERICO DE CADA NAIPE
        //-- SIN IMPORTAR SI SON LETRAS O NUMEROS

        const valorCarta =(carta)=>{
            const valor = carta.substring(0,carta.length-1) ;  
            return ( isNaN(valor)) ?  
                    (valor=== 'A'? 11:10)  
                    :valor *1;
        } ;

        
        //Eventos

        btnPedir.addEventListener('click', ()=>{
            const carta = pedirCarta();
            let puntosJugador =  acumularPuntos(carta,0);
            crearCarta(carta, 0);

            if ( puntosJugador > 21){
                console.warn('Perdiste practica mas');
                btnPedir.disabled   = true;
                btnDetener.disabled = true;
                turnoPc(puntosJugador);
            }else if( puntosJugador===21 ){
                console.warn('21!!! Haz ganadooo');
                btnPedir.disabled   = true; 
                btnDetener.disabled = true;
                turnoPc(puntosJugador);
                }
        });

       


        //-- Turno de la PC:
        const crearCarta =(carta, turno)=>{
            const   imgCarta     = document.createElement('img');
            imgCarta.src =   `./assets/img/${ carta }.png`;
                imgCarta.classList.add('carta');
                divCartasJugador[turno].append(imgCarta);
                
        }

        const turnoPc = (puntosMinimos)=>{
        let puntosPc = 0;     
        do{
        const carta = pedirCarta();
        puntosPc    = acumularPuntos(carta,puntosjugadores.length-1);
        
        crearCarta(carta,puntosjugadores.length-1)    ;
                if (puntosMinimos>21){
                    break;
                }

        }while( (puntosPc<puntosMinimos) && (puntosMinimos<= 21) );

        setTimeout(()=>{
                if(puntosPc === puntosMinimos){
                        alert('Que coincidencia empatamos =P')
                }else if(puntosMinimos===21) {
                    alert('Ganaste... eres muy habil')
                }
                
                else if(puntosMinimos>21){
                        alert('te hubieras quedado wey!, te gane ');
                }else if (puntosPc > 21){
                        alert('Que suerte, me ganaste');
                }else{
                        alert('Ya te gane =)');
                }
            },700)
        };

        btnDetener.addEventListener('click',()=>{
            btnPedir.disabled   = true;
            btnDetener.disabled = true;

            turnoPc(puntosjugadores[0]);
        }); 


        btnNuevo.addEventListener('click',()=>{
            console.clear();
            igniteGame();
                
                
                
                
                btnPedir.disabled   = false;
                btnDetener.disabled = false;
            });

    
})();
