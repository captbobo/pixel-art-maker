/*eslint-env browser, jquery*/


// Pixel-Art Maker by Can Sürmeli
//


$(document).ready(function(){    
    let gridWidth, gridHeight;
    let drag = false;
    let zPress = false;
    let colorBar = $(".color-container");
    let introBarShow = $(".intro").is(":visible");
    let deleteKey = 90; // the keycode for 'erasing key', 'z' for 90
    
    let colorPicked = '#323232';  
    let colorPalette = ["#011627",
                        "#08415C",
                        "#CC2936",
                        "#059C75",
                        "#2589BD"];

    const colorInput = $("input[type=color]");
    const canvas = $(".canvas");
    
    colorInput.each(function(e){
        $(this).val(colorPalette[e]);
        let value = $(this).val();
        $(this).parent(".input-color").css("background-color", value);
    });
    
    
    // Go button action 
    $("#go-button").click(function () {            
        canvas.empty();                         
        gridWidth = $("#input-width").val();
        gridHeight = $("#input-height").val();
        
        if((gridWidth > 0 && gridWidth < 50)&&(gridHeight > 0 && gridHeight < 50)) {
            makeGrid(gridHeight, gridWidth)
        } else alert("A canvas of "+gridWidth+" by "+gridHeight+"? Exciting... but no, I can't do that...");  
        
        colorSlide(introBarShow);
        arrows(introBarShow);
    });
    
    // sliding animation
    $("header").click(function(){
        colorSlide(introBarShow);
        arrows(introBarShow);
    });

    canvas.contextmenu(false);
       
    // dragging feature
    canvas.mousedown(function(event){
        drag = true;
        if (event.which === 3 || delKey(deleteKey)){
            deleteColor(event);
        } else {
            colorIt(event, colorPicked);
        }

    });
    
     $("body").mouseup(function(){
        drag = false;
    });
    
    // pixels can be erased/deleted by pressing the key assigned below
    // It is assigned as 90 above, corresponds to the key 'z'
    // This feature is added for touch-pad users
    delKey(deleteKey); 
    
    // drag-and-paint and drag-and-erase combined 
    canvas.mouseover(function(event){
        if(drag && event.which === 3){  // right-click drag
            deleteColor(event);
        } else if (drag && delKey(deleteKey)){ // erase key + drag
            deleteColor(event);
        } else if (drag){
            colorIt(event, colorPicked);
            }
    });   
    
        // choosing colors 
    $("input[type=color]").change(function(e){
        let id = e.target.id;
        switch (id) {
            case "picker1":
                colorPalette[0] = $(this).val();
                colorPicked = $(this).val(); 
                break;
            case "picker2":
                colorPalette[1] = $(this).val();
                colorPicked = $(this).val();
                break;
            case "picker3":
                colorPalette[2] = $(this).val();
                colorPicked = $(this).val();
                break;
            case "picker4":
                colorPalette[3] = $(this).val();
                colorPicked = $(this).val();
                break;
            case "picker5":
                colorPalette[4] = $(this).val();
                colorPicked = $(this).val();
                break;
        }

    });
    
   
        
    
    
    // choosing colors with keybindings Q, W, E, R, T
    $(document).keydown(function(e){
        let key = e.which;
        switch(key) {
            case 81:
                colorPicked = colorPalette[0];
                break;
            case 87:
                colorPicked = colorPalette[1];
                break;
            case 69:
                colorPicked = colorPalette[2];
                break;
            case 82:
                colorPicked = colorPalette[3];
                break;
            case 84:
                colorPicked = colorPalette[4];
                break;
        };
    });
   

    
    function makeGrid(height, width){
        let i = 1; // Grid maker function
        while(i<= height){
            canvas.append("<tr></tr>");
            for(var j = 1; j <= width; j+=1){
                $("tr").last().append(function(){
                    return "<td></td>";
                });
            }
        i+=1;
        }
        
        $(".input").slideUp(1000);
    };
    
        
    function colorIt(event, color){
        $(event.target).css("background-color", color);
    };
    
    
    function deleteColor(event){
         $(event.target).css("background-color", "whitesmoke")
    };
     
    function delKey (keyEvent){
        
            $(document).keydown(function(e){
                if(e.which === keyEvent){
                zPress = true;
                }  
            });
       
            $(document).keyup(function(e){
                if(e.which === keyEvent){
                    zPress = false;
                }  
            });
        return zPress;
        };
   
    //arrow animation
    function arrows(event) {
        // arrow animation
        $(".arrow").toggleClass("down", event);
        $(".arrow").toggleClass("up", !event);
    }
    
    function colorSlide(event){
        $(".intro").slideToggle(1000); 
    
        if (event) {
            colorBar.delay(100).slideToggle(800);
            console.log(event);
        } else {
            colorBar.delay(100).slideToggle(800);
            console.log(event);
            
        }   
    }
     
});

    