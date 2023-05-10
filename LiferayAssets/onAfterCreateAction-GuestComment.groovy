import com.liferay.portal.kernel.service.ServiceContext
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.model.UserConstants;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.CompanyLocalServiceUtil;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalServiceUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.PortalUtil;
import java.util.Calendar;
import java.util.GregorianCalendar;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.comment.CommentManagerUtil

//com.liferay.object.model.ObjectDefinition#44538

def getClassName()
{
    switch (assetEntryType)
    {
        case "journalArticle":
            return "com.liferay.journal.model.JournalArticle";
            break;
        case "blog":
            return "com.liferay.blogs.model.BlogsEntry";
        case "object":
            return 'com.liferay.object.model.ObjectDefinition#'+objectDefinitionId;
    }
}

def postComment(userId, groupId, className, classPK, commentBody,serviceContext)
{
    def userDisplayURLFunction = { _ -> serviceContext } // empty function to set userDisplayURL
    // Add the comment to the blog entry
    System.out.println CommentManagerUtil.addComment(userId, groupId, className, classPK, commentBody, userDisplayURLFunction)
}

def obj = com.liferay.object.service.ObjectEntryLocalServiceUtil.getObjectEntry(id)



ServiceContext serviceContext  = new ServiceContext();
def classPK = GetterUtil.getLong(assetEntryId)
def commentBody = comment

long groupId =  GetterUtil.getLong('20121');
long companyId = GetterUtil.getLong(obj.companyId);
Company company = CompanyLocalServiceUtil.getCompany(companyId);
String portalURL = company.getPortalURL(groupId);
final long creatorUserId = GetterUtil.getLong('20125');

serviceContext.setCompanyId(companyId);
serviceContext.setUserId(creatorUserId);
serviceContext.setPortalURL(portalURL);
serviceContext.setPathMain(PortalUtil.getPathMain());
serviceContext.setScopeGroupId(groupId);

final boolean autoPassword = false;
final String tempPassword = "test";
final boolean autoScreenName = true;
final boolean male = false;
final boolean sendAccountCreationEmail = false;
final long prefixId = -1L;
final long suffixId = -1L;
final long[] siteIds = [ groupId ];
final Calendar dob = new GregorianCalendar(1970, 1, 1);
locale = LocaleUtil.getDefault();
String firstName = "Guest";
String lastName = "User";
String emailAddress = "temp_user_"+ipAddress+"@liferay.com";
String screenName = "temp_user_"+ipAddress;
long entryId =GetterUtil.getLong(assetEntryId);
def className = getClassName();
def guestUserId = GetterUtil.getLong('56097');
//todo validation required


if(ratedByUserId == "0")
{
    User newUser = null;
    try{

         newUser =UserLocalServiceUtil.addUser(
                0, companyId, false, "test", "test", false,
                screenName, emailAddress, LocaleUtil.getDefault(), firstName,
                null, lastName, 0, 0, true, Calendar.JANUARY, 1, 1970, null, null, null, null,
                null, false, serviceContext);
        long userId = newUser.userId
        postComment(guestUserId, groupId, className, classPK, commentBody,serviceContext)
        def obj_Update = com.liferay.object.service.ObjectEntryLocalServiceUtil.getObjectEntry(id)
        def values = obj.getValues();
        values["ratedByUserId"] = guestUserId;
        obj.setValues(values);
        com.liferay.object.service.ObjectEntryLocalServiceUtil.updateObjectEntry(creatorUserId,id,values,serviceContext);

    }catch (exp)
    {
        System.out.println (exp.getMessage())
    }finally
    {
        if(newUser)
        {
            long userId = newUser.userId
            UserLocalServiceUtil.deleteUser(userId)
        }
    }
}
else
{
    postComment(GetterUtil.getLong(ratedByUserId), groupId, className, classPK, commentBody,serviceContext)
}





