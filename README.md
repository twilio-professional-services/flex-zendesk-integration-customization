# Flex Plugin Zendesk Integration Customization

## Disclaimer

**This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Twilio bears no responsibility to support the use or implementation of this software.**

## Plugin Overview

Twilio has a Zendesk CTI Flex Integration that is [documented here](https://www.twilio.com/docs/flex/admin-guide/integrations/zendesk) and enables Flex UI to run in an iFrame within Zendesk.

This integration is implemented in a Twilio plugin that loads alongside your existing plugins and makes use of the [Zendesk App Framework (ZAF) sdk](https://developer.zendesk.com/api-reference/apps/introduction/) to integrate with Zendesk.

From the Flex UI admin page you can configure the integration to log [Task Attributes](https://www.twilio.com/docs/taskrouter/api/task#task-attributes) into a Zendesk Ticket. The default behavior is that all of the Task Attributes data is logged to the ticket.

This plugin example shows how you can include the ZAF sdk into a plugin and makes use of the sdks [request method](https://developer.zendesk.com/api-reference/apps/apps-core-api/client_api/#clientrequestoptions) to customize the Task Attribute data that is logged to the ticket.

If additional customizations are necessary or you wanted to disable the Twilio Zendesk CTI Flex Integration and code your own this would be a good framework to start from.

## Plugin Constraints/Assumptions

This POC plugin assumes that the Task Attributes have been populated with the zendesk ticket id in advance and that they are in the parameter ```zd_ticket_id ```

In some use cases this may not be possible and additional work would need to be done to query zendesk for the ticket id.

The sample code updates the ticket with the contents of the Task Attribute parameter ```customZDLogMessage``` on task completed but this is easily customized as required [here](src/taskToLogPayloadHandler.ts)

## Developer Notes

When developing Flex UI plugins often the plugin is run locally until ready to be deployed and tested as described in the setup section below.

For local development it is useful to ensure that the native Zendesk Integration is run in parallel with this plugin. To achieve this update the public/appConfig.js to include

```    
  pluginService: {
    enabled: true,
    url: "/plugins.json",
  },
```

And then check the latest version of the Twilio Zendesk Integration by running ```Twilio.Flex.Plugins``` in the Chrome Dev Console when in the iFrame context and checking which version has been downloaded from Twilio. Alternatively use the network tab to check the response from Flex UIs request to the plugins endpoint.

You can then set public/plugins.json as follows: (replacing the local plugin name, port and flex zendesk integration version as required)
```[
    {
    "phase": 1,
    "name": "Twilio Zendesk Integration Plugin",
    "version": "1.4.5",
    "src": "https://assets.flex.twilio.com/twilio/flex-zendesk-integration/1.4.5/plugin-flex-zendesk-integration.js"
  },
  {
    "phase": 3,
    "name": "FlexZendeskIntegrationCustomizationPlugin",
    "src": "http://localhost:3000/plugins/flex-zendesk-integration-customization.js"
  }
]
```


You should then be able to setup a tunnel using a tool such as [ngrok](https://ngrok.com) to expose your local plugin to the internet and in Zendesk navigate to Admin Center -> Apps and Integrations -> Zendesk Support apps and set the Flex URL in the Twilio Flex app to your publicly addressable endpoint in the format:
```https://xxx.ngrok.io/?path=/agent-desktop```


## Setup

### Zendesk Integration Configuration
**Before following the standard plugin setup instructions you should disable the native integrations task logging**

This step is important to avoid the native integration plugin *and* this plugin from writing to the ticket.

This can be from Flex UI -> Admin Menu -> Integrations -> Zendesk Configure -> Edit Configuration and unchecking the 'Task Logging enabled on' options.


### Plugin Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex
```

### Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.






