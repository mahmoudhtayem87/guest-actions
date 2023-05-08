import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.ratings.kernel.service.RatingsEntryLocalServiceUtil;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.model.Company;

import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.CompanyLocalServiceUtil;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalServiceUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.PortalUtil;
import java.util.Calendar;
import java.util.GregorianCalendar;
import com.liferay.portal.kernel.util.GetterUtil;

def obj = com.liferay.object.service.ObjectEntryLocalServiceUtil.getObjectEntry(id)



ServiceContext serviceContext  = new ServiceContext();


long groupId = GetterUtil.getLong(obj.groupId);
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
String firstName = "temp_user_first_"+ipAddress;
String lastName = "temp_user_last_"+ipAddress;
String emailAddress = "temp_user_"+ipAddress+"@liferay.com";
String screenName = "temp_user_"+ipAddress;
long entryId =GetterUtil.getLong(assetEntryId);
double score = GetterUtil.getLong(rating)
//double score = GetterUtil.getLong("-1L")


String entryType=GetterUtil.getString(assetEntryType)

def getClassName(assetTypeName)
{
    switch(assetTypeName)
    {
        case "blog":
            return "com.liferay.blogs.model.BlogsEntry";
            break;
        case "journalArticle":
            return "com.liferay.journal.model.JournalArticle";
            break;
    }
}

String className =getClassName (entryType);

//todo validation required


if(ratedByUserId == "0")
{
    if(lastActionUserId != "")
    {
        System.out.println("inside")
        if(entryType.equals("blog")){
            RatingsEntryLocalServiceUtil.updateEntry(GetterUtil.getLong(lastActionUserId), className, entryId, score, serviceContext)
        }
        if(entryType.equals("journalArticle")){
            RatingsEntryLocalServiceUtil.updateEntry(GetterUtil.getLong(lastActionUserId),className, entryId, score, serviceContext)
        }
    }
    else{
        User newUser =UserLocalServiceUtil.addUser(
                0, companyId, false, "test", "test", false,
                screenName, emailAddress, LocaleUtil.getDefault(), "Test",
                null, lastName, 0, 0, true, Calendar.JANUARY, 1, 1970,
                null, null, null, null,
                null, false, new ServiceContext());
        long userId = newUser.userId

        if(entryType.equals("blog")){
            RatingsEntryLocalServiceUtil.updateEntry(userId, className, entryId, score, serviceContext)

        }
        if(entryType.equals("journalArticle")){

            RatingsEntryLocalServiceUtil.updateEntry(userId, className, entryId, score, serviceContext)

        }

        UserLocalServiceUtil.deleteUser(userId)
        def values = obj.getValues();
        values["ratedByUserId"] = userId;
        obj.setValues(values);
        com.liferay.object.service.ObjectEntryLocalServiceUtil.updateObjectEntry(creatorUserId,id,values,serviceContext);

    }

}else
{
    if(entryType.equals("blog")){
        RatingsEntryLocalServiceUtil.updateEntry(GetterUtil.getLong(ratedByUserId), className, entryId, score, serviceContext)
    }
    if(entryType.equals("journalArticle")){

        RatingsEntryLocalServiceUtil.updateEntry(userId, className, entryId, score, serviceContext)
    }

}





