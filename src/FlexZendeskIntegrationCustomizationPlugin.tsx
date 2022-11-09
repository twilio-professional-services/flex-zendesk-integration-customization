import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import { isFlexInsideCRMIframe } from './helpers/iframe';
import { loadScript } from './helpers/script-loader';
import { getZendeskClient } from "./helpers/zendesk-client";
import { Actions } from '@twilio/flex-ui';
import { exampleTaskToLogPayloadHelper} from "./helpers/taskToLogPayloadHandler"

const PLUGIN_NAME = 'FlexZendeskIntegrationCustomizationPlugin';

const CRM_SDK_URI =
  "https://static.zdassets.com/zendesk_app_framework_sdk/2.0/zaf_sdk.min.js";

const CRM_URI = "zendesk.com" // used to ensure we are iframed from this domain
 

export default class FlexZendeskIntegrationCustomizationPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {

    if (isFlexInsideCRMIframe(CRM_URI))
    {
      await loadScript(CRM_SDK_URI);
      const client = getZendeskClient()

      Actions.addListener("afterCompleteTask", (payload: any) => {
        exampleTaskToLogPayloadHelper(client, payload.task)
      })
    }
    else
    {
      console.error(`${PLUGIN_NAME} not starting as not iframed from ${CRM_URI}`)  
    }
     
  }
}
