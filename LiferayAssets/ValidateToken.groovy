import com.liferay.portal.kernel.json.JSONFactoryUtil

def ValidateToken(token)
{
    def secretKey = '6LdWSdglAAAAAJKOWiQYNn_115dYhAcTbw6xH3dk'
    def url = 'https://www.google.com/recaptcha/api/siteverify?secret='+secretKey+'&response='+token
    def postmanGet = new URL(url)
    def getConnection = postmanGet.openConnection()
    getConnection.requestMethod = 'GET'

    if(getConnection.responseCode == 200)
    {
        def result = JSONFactoryUtil.createJSONObject(getConnection.content.text);
        if(result["success"] == "true")
            return true;
        else
            return false;
    }else
        return false;

}
