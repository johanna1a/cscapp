import json
import boto3


#create a bedrock client
bedrock_client = boto3.client("bedrock-agent-runtime")
s3_client = boto3.client('s3')

def handler(event, context):
  
    # Extract the query from the event
    prompt = event['prompt']

    # Define the knowledge base ID and model ARN
    knowledge_base_id = '9RJODRMRHE'
    model_arn = 'anthropic.claude-3-sonnet-20240229-v1:0'

    # Define the retrieval configuration
    retrieval_config = {
        'SearchType': 'SEMANTIC',
        'MaxResults': 3,
        'Filters': []
    }

    # Define the retrieve and generate configuration
    retrieve_and_generate_config = {
        'type': 'KNOWLEDGE_BASE',
        'knowledgeBaseConfiguration': {
            'knowledgeBaseId': '9RJODRMRHE',
            'modelArn': 'anthropic.claude-3-sonnet-20240229-v1:0'}}

    # Make the RetrieveAndGenerate API call
    response = bedrock_client.retrieve_and_generate(
        input={
            'text': prompt
        },
        retrieveAndGenerateConfiguration=retrieve_and_generate_config
    )

    # Process the response
    generated_text = response.get('output', '')
    s3_uris = []
    for citation in response.get('citations', []):
        for reference in citation.get('retrievedReferences', []):
            location = reference.get('location', {})
            s3_location = location.get('s3Location', {})
            uri = s3_location.get('uri', '')
            if uri:
                s3_uris.append(uri)
    #Grab the url from the s3 objects
    object_uris = []
    for uri in s3_uris:
        bucket_name, key = uri.replace('s3://', '').split('/', 1)
        response = s3_client.get_object(Bucket=bucket_name, Key=key)
        metadata = response['Metadata']

        if 'url' in metadata:
            object_uris.append(metadata['url'])


    print('received event:')
    print(event)
  
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Hello from your new Amplify Python lambda!')
    }