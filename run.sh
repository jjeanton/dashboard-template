#!/bin/bash
CMD=$1

case "$CMD"
in
        "desarrollo" ) echo "Modo desarrollo"
        npm install
        npm audit fix
        npm start
        ;;
        "produccion" ) echo "Modo desarrollo"
        npm install
        npm audit fix
        npm run build
        ;;
        * ) echo "Select two options"
        echo "run.sh desarrollo"
        echo "run.sh produccion"
esac
