const all_elements = {
    // All required elements to be placed here with there properties in the form of object
    hydrogen : {
        atomic_number : 1,
        atomic_mass : 1.08,
        symbol : "H",
        element_name : "Hydrogen",
        element_properties : {
            property1 : "Non Metal"
        }
    },
    helium : {
        atomic_number : 2,
        atomic_mass : 4.0026,
        symbol : "He",
        element_name : "Helium",
        element_properties : {
            property1 : "Noble Gas"
        }
    },
    lithium : {
        atomic_number : 3,
        atomic_mass : 7,
        symbol : "Li",
        element_name : "Lithium",
        element_properties : {
            property1 : "Alkali Metal"
        }
    },
    beryllium : {
        atomic_number : 4,
        atomic_mass : 9.0121,
        symbol : "Be",
        element_name : "Beryllium",
        element_properties : {
            property1 : "Alkaline Earth Metal"
        }
    },
    boron : {
        atomic_number : 5,
        atomic_mass : 10.81,
        symbol : "B",
        element_name : "Boron",
        element_properties : {
            property1 : "Metalloid"
        }
    },
    carbon : {
        atomic_number : 15,
        atomic_mass : 12.011,
        symbol : "C",
        element_name : "Carbon",
        element_properties : {
            property1 : "Non Metal"
        }
    },
    nitrogen : {
        atomic_number : 7,
        atomic_mass : 14.007,
        symbol : "N",
        element_name : "Nitrogen",
        element_properties : {
            property1 : "Non Metal"
        }
    },
    oxygen : {
        atomic_number : 8,
        atomic_mass : 15.999,
        symbol : "O",
        element_name : "Oxygen",
        element_properties : {
            property1 : "Non Metal"
        }
    },
    
}

console.log(all_elements);

// Looping across all elements with the object containing all elements information
for (element in all_elements){
    main_element = all_elements[element];
    // Calling createHTML() function to make one complete element div structure
    createHTML(element, main_element.atomic_number, main_element.atomic_mass, main_element.symbol, main_element.element_name, main_element.element_properties.property1, main_element.element_properties.property2 );
}

// Justing printing total grid structure of periodic table
main_div = document.querySelector('.periodic_content');
console.log(main_div);


// CreateHTML() function : This function itself call createElement() function that creates HTML elements
// at the lowest level by passing parent_class, type of element to be constructed, classes needed to be added
// in the HTML element and last innerHTML value that will be displayed as output on screen
function createHTML(element, atomic_number, atomic_mass, element_symbol, element_name, property){
    // Parent for element
    createElement(null, 'periodic_content', 'div', false, 'element', `${element}`, 'text_center', 'primary_bgcolor', 'br_primary', 'pad10');

        // Top part of element
        createElement(null, `${element}`, 'div', false, 'element_top_content', 'flex', 'align_center', 'space_between');

            // Atomic number parent
            createElement(element, 'element_top_content', 'div', false, 'element_atomic_number');
    
                // Atomic number
                createElement(element, 'element_atomic_number', 'p', `${atomic_number}`);
    
            // Atomic mass parent
            createElement(element, 'element_top_content', 'div', false, 'element_atomic_mass');

                // Atomic number
                createElement(element, "element_atomic_mass", 'p', `${atomic_mass}`);

        // Bottom part of element
        createElement(null, `${element}`, 'div', false, 'element_bottom_content');

            // Element Symbol parent
            createElement(element, 'element_bottom_content', 'div', false, 'element_symbol');

                // Element symbol
                createElement(element, "element_symbol", 'h2', `${element_symbol}`);

            // Element Name parent
            createElement(element, 'element_bottom_content', 'div', false, 'element_name');
             
                // Element name
                createElement(element, "element_name", 'p', `${element_name}`);
            
            // Element Properties parent
            createElement(element, 'element_bottom_content', 'div', false, 'element_properties');
             
                // Element property
                // for (let myproperty of property){
                    createElement(element, "element_properties", 'p', `${property}`);
                    // **IMPORTANT**
                    // Adding data attribute property in .element class which is parent 
                    document.querySelector(`.${element}`).dataset.property = property;
                // }

}

// createElement() function
function createElement(main_parent_element, parent_class, new_element, content, ...classes){
    // Finding parent : parent_element
    parent_element = (main_parent_element == null) ? document.querySelector(`.${parent_class}`) : document.querySelector(`.${main_parent_element} .${parent_class}`);
    // Creating new child element : new_element
    new_element = document.createElement(`${new_element}`);
    // If content is available than we will store value within the new_element's innerHTML 
    new_element.innerHTML = content!=false ? content : null;
    // Now we append child element(new_element) within parent(parent_element)
    parent_element.appendChild(new_element);
    // Adding all available classes to the new child element(new_element)
    for (let newclass of classes){
        new_element.classList.add(newclass);
    };
}


// Creating Filters for different type of element within the property of the element
function filterElement(btn){
    // Toggling button with active class 
    let all_active_button = document.querySelectorAll('.periodic_filter_buttons .button_active');
    let all_active_button_array = [...all_active_button];
    all_active_button_array.forEach((element) => { element.classList.remove('button_active');})
    btn.classList.add('button_active');

    // Toggling display of element 
    let all_elemnts_child = document.querySelector('.periodic_content').children;
    let all_elemnts_child_array = [...all_elemnts_child];
    if(btn.dataset.property == "Show All"){
        // If dataset has property "show all" 
        all_elemnts_child_array.forEach((element)=>{element.classList.remove('none');});
    }else{
        // If dataset has property that is specific to the element 
        all_elemnts_child_array.forEach((element) => {element.classList.remove('none');});
        all_elemnts_child_array.forEach((element) => {
            if(btn.dataset.property!=element.dataset.property){
                element.classList.add('none');
            }
        });
    }
}

// Creating Sorting for different type of element wrt to name and other property of the element
function sortElement(btn){
    // Toggling button with active class 
    let all_active_button = document.querySelectorAll('.periodic_sort_buttons .button_active');
    let all_active_button_array = [...all_active_button];
    all_active_button_array.forEach((element) => { element.classList.remove('button_active');})
    btn.classList.add('button_active');


    // Sorting Parameter
    let soring_parameter = document.querySelectorAll(`.periodic_sort_buttons button`)
    soring_parameter.forEach((para, index)=>{
        // first = soring_parameter[index].innerText;
        // second = soring_parameter[index+1].innerText;
        console.log(para.element_name);
    })

    
    // Toggling display of element 
    // let all_elemnts_child = document.querySelectorAll('.periodic_content .element_name p');
    // all_elemnts_child_array = [...all_elemnts_child];
    // all_elemnts_child_array.forEach((element)=>{
    //     console.log(element.innerHTML);
    // })

    // if(btn.dataset.property == "Show All"){
    //     // If dataset has property "show all" 
    //     all_elemnts_child_array.forEach((element)=>{element.classList.remove('none');});
    // }else{
    //     // If dataset has property that is specific to the element 
    //     all_elemnts_child_array.forEach((element) => {element.classList.remove('none');});
    //     all_elemnts_child_array.forEach((element) => {
    //         if(btn.dataset.property!=element.dataset.property){
    //             element.classList.add('none');
    //         }
    //     });
    // }



}







