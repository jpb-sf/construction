
let init = (function() {
	
	// Directs scroll to 'projects' section 
	function goProjects()
	{
		if (window.location == "https://www.jasonbergland.com/projects")
		{
			let projectsY = document.getElementById('projects').offsetTop; // returns the distance of the outer border of the current element relative to the inner border of the top of the offsetParent node. 
			window.scrollTo(0, projectsY);
		}
	}
	goProjects()
	console.log(window.innerWidth)

	// Recursive function. Scroll the y axis of browser's scroller incrementally over a short period of time (calling itself every 1/50th of a second, 20 times)
	function moveScroll(i, locationY, increment) {
		setTimeout(function(){
		if (i)
		{	
			locationY += increment;
			window.scrollTo(0, locationY);
			moveScroll(--i, locationY, increment)
		}
		}, 20);  
	};
	// When nav or home buttons clicked window scrolls to that scroll height (location) of the web page
	function navScroll2(button) 
	{	
		let locationY, scrollIncrement;
		button = button.toLowerCase();
		let section = document.getElementById(button).offsetTop;

		locationY = window.scrollY;
		// If home button clicked and scroll is already at top, end function.
		if (button == "top" && locationY == 0)
		{
			return
		}

		// Find the the scrollIncrement in pixels needed to reach desired point on Y axis with 20 exections of moveScroll()
		if (window.innerWidth < 980 && window.innerWidth > 500) // If statment: adjust offset for screen size
		{
			scrollIncrement = ((section + 40) - locationY) / 20;
		}
		else if (window.innerWidth <= 500){

			scrollIncrement = ((section + 10) - locationY) / 20;
		}
		else {
			scrollIncrement = ((section - 20) - locationY) / 20;
		}

		moveScroll(20, locationY, scrollIncrement);
	}
	
	// Functions manages opacity and padding in the the appearing of the section/content when scrolled or clicked.
	function appear(i, elem)
	{	
		let padding = 10;
		let opacity = 0;
		// Recursively executes a delay for animated effect
		(function delay(i, elem) 
		{	
			// SetTimeout (function to be ran, delay in ms)
			setTimeout(function()
			{	
				if (i)
				{
					elem.style.opacity = opacity.toString();
					elem.style.paddingTop = padding.toString() + "rem";
					opacity += .1;
					padding -= 1;
					delay(--i, elem)
				}
			// 25 is a 1/4 of a 10th of a second, or 1/40th of a second. 
			}, 25); 
			// delay function called i(10) times which executes the setTimeout .025 X 10, which in total time, spans .25, or a quarter of a second
		}) (i, elem);
	}

	let projects = document.querySelector('#projects');
	let about = document.querySelector('#about');
	let contact = document.querySelector('#contact');

	// Set opacity style to 0
	projects.style.opacity = "0";
	about.style.opacity = "0";
	contact.style.opacity = "0";

	// Set padding styles
	about.style.paddingTop = "10rem";
	contact.style.paddingTop = "10rem";

	// flags for scrollManager, true means the corresponding section in the HTML have not 'appeared' via appear()
	let projectsFlag = aboutMeFlag = contactFlag = true;

	// Function keeps track of scroll Y position in window and trips appear() function depending on the Y position
	let scrollManager = function() 
	{	
		let locationY = window.scrollY;
		
		// If scroll Y (locationY) is greater than the top pixel of "projects" section (minus an offset of 600 pixels), call appear()
		if (projectsFlag && (locationY > (projects.offsetTop - 600)))
		{	
			appear(10, projects);
			projectsFlag = false;
		}
		// See above if statement comment
		if (aboutMeFlag && (locationY > (about.offsetTop - 950)))
		{	
			appear(10, about)
			aboutMeFlag = false;
		}
		// See above if statement comment
		if (contactFlag && (locationY > (contact.offsetTop - 1050)))
		{	
			appear(10, contact)
			contactFlag = false;
		}
	}
	let scrollListen = window.addEventListener('scroll', scrollManager);

	// Prevents browser form resubmisson during a refresh. (Glitch that sends form data again upon a refresh)
	if ( window.history.replaceState ) {
	  window.history.replaceState( null, null, window.location.href );
	}
	
	// Creates 'Project under maintenance' banner when clicked
	let maintenanceFlag = true;
	let thisVar = document.querySelector('.maintenance-link').addEventListener('click', () => {

		if (maintenanceFlag)
		{	
			maintenanceFlag = false
			const maintenance = document.querySelector('.maintenance2');
			const gitSub = document.querySelector('.maintenance__sub2');
			const element = document.createElement('span');
			let message = document.createTextNode('Sorry, this project is under maintenance.')
			element.appendChild(message);
			element.classList.add('maintenance')
			maintenance.insertBefore(element, gitSub)
		}
	})

	// Creates click listeners for the nav buttons
	let navBtnListeners = function(htmlCol)
	{	
		// Loop through html collection of nav buttons and add listener 
		for (let i = 0; i < htmlCol.length; i++)
		{
			htmlCol[i].addEventListener('click', () => {
				navScroll2(htmlCol[i].firstChild.nodeValue)
			})
		}
		// Add listener for home/logo button
		document.querySelector('.home').addEventListener('click', () => {
			navScroll2('top')
		})
	}
	let navBtn = document.getElementsByClassName('nav-btn');
	navBtnListeners(navBtn)
})()

//  Notes to self =================
// element.offsetTop property will get the top pixel on the y axis of an element. This will account for its margin, not padding, or border
// window.scrollTo(500,0) go to 500th pixel vertically
// window.scrollBy(500,0) travel 500 positive pixels vertically from current



















