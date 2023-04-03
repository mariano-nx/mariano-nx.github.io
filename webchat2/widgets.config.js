window._genesys = {
  widgets: {
	main: {
		preload: ['webchat'],
	},
    webchat: {
	  
	  form: {
		wrapper: "<table></table>",
        inputs:[
		  {
			  id:'name',
			  name:'Name',
			  maxlenght: '100',
			  placeholder:'Required',
			  label:'Name',
			  validate:function (event, form, input, label, $, CXBus, Common) {
                if (input && input.val() && (input.val()).length >= 2) {
                    return true;
                } else {
                    return false;
                }
            }
		  },
		  {
			  id:'email',
			  name:'Email',
			  maxlenght:'255',
			  placeholder:'Required',
			  label:'Email',
			  validate:function (event, form, input, label, $, CXBus, Common) {
                if (input && input.val() && (input.val()).length >= 4 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.val())) {
                    return true;
                } else {
                    return false;
                }
            }
		  },
		  {
			  id:'dropdown',
			  name:'Dropdown',
			  placeholder:'Optional',
			  label:'Dropdown',
			  type:'select',
			  options:[
			    {
                    disabled: "disabled",
                    selected: "selected",
                    hidden: "hidden"
                },
                {
                    text: "Value A",
                    value: "Value A"
                },
                {
                    text: "Value B",
                    value: "Value B"
                },
				{
					text: "Value C",
                    value: "Value C"
				}
			  ],
			  wrapper:"<tr><th>{label}</th><td>{input}</td></tr>"
		  }
        ]		  
	  },
	  chatButton: {
        enabled: true,
		template: '<div class="cx-widget cx-webchat-chat-button cx-side-button" role="button" tabindex="0" data-message="ChatButton" data-gcb-service-node="true"><span class="cx-icon" data-icon="chat"> </span><span class="i18n cx-chat-button-label" data-message="ChatButton"></span></div>',
		effect: 'fade',
		openDelay: 1000,
		effectDuration: 300,
		hideDuringInvite: true
      },
      transport: {
        type: 'purecloud-v2-sockets',
        dataURL: 'https://api.mypurecloud.com',     // replace with API URL matching your region
        deploymentKey : '9ac02544-7d12-42e3-8098-05963be7bafa',  // replace with your Deployment ID
        orgGuid : 'b969b710-80cf-4689-9bcf-e9f3befa8e05',              // replace with your Organization ID
        interactionData: {
          routing: {
            targetType: 'QUEUE',
            targetAddress: 'MarianoTest',
            priority: 1
          }
        }
      },
      userData: {
        // These fields should be provided via advanced configuration
        // firstName: 'Praenomen',
        // lastName: 'Gens',
        // email: 'praenomen.gens@calidumlitterae.com',
        // subject: 'Chat subject'
      }
    }
  }
};