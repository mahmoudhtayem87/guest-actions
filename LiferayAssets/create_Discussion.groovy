import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import javax.xml.transform.TransformerFactory
import javax.xml.transform.dom.DOMSource
import javax.xml.transform.stream.StreamResult
import com.liferay.dynamic.data.mapping.model.DDMFormInstanceRecordVersion;
import com.liferay.dynamic.data.mapping.model.Value;
import com.liferay.dynamic.data.mapping.service.DDMFormInstanceRecordVersionLocalServiceUtil;
import com.liferay.dynamic.data.mapping.storage.DDMFormFieldValue;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.workflow.WorkflowConstants;
import java.util.Locale;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.journal.service.JournalArticleLocalServiceUtil
import com.liferay.dynamic.data.mapping.model.DDMFormInstanceRecordVersion;
import com.liferay.dynamic.data.mapping.model.Value;
import com.liferay.dynamic.data.mapping.service.DDMFormInstanceRecordVersionLocalServiceUtil;
import com.liferay.dynamic.data.mapping.storage.DDMFormFieldValue;
import java.util.Locale;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.service.CompanyLocalServiceUtil;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalServiceUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.PortalUtil;
import com.liferay.portal.kernel.workflow.WorkflowConstants;
import java.util.Calendar;
import java.util.GregorianCalendar;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.asset.kernel.service.AssetTagLocalServiceUtil
import com.liferay.asset.kernel.exception.DuplicateTagException
import com.liferay.asset.kernel.exception.AssetTagException
import com.liferay.asset.kernel.model.AssetTag;
import com.liferay.asset.kernel.service.AssetVocabularyLocalServiceUtil


def ddmStructureKey = "45618";
def ddmTemplateKey = "";
def folderId = GetterUtil.getLong('46154');
def TagNamesGlobal = "";
def CategoryName = "";
def CategoryId = 0L;
def VocabularyId = 44839 as long;
final long creatorUserId = GetterUtil.getLong('20125');

long groupId = GetterUtil.getLong((String)workflowContext.get(WorkflowConstants.CONTEXT_GROUP_ID));
long companyId = GetterUtil.getLong((String)workflowContext.get(WorkflowConstants.CONTEXT_COMPANY_ID));
Company company = CompanyLocalServiceUtil.getCompany(companyId);
String portalURL = company.getPortalURL(groupId);

ServiceContext serviceContext  = new ServiceContext();
serviceContext.setCompanyId(companyId);
serviceContext.setUserId(creatorUserId);
serviceContext.setPortalURL(portalURL);
serviceContext.setPathMain(PortalUtil.getPathMain());
serviceContext.setScopeGroupId(groupId);


def getCategoryId(categoryName,vocabularyId)
{
    def categories = AssetVocabularyLocalServiceUtil.fetchAssetVocabulary(vocabularyId as long).getCategories()
    def filteredList = categories.findAll { item -> item.name == categoryName
    }
    return filteredList[0].categoryId;
}
def createJournalArticle(userId,groupId,folderId,title,description,content,ddmStructureKey,ddmTemplateKey,serviceContext,TagNamesGlobal,CategoryId)
{
    JSONObject formValuesMap = JSONFactoryUtil.createJSONObject();
    final long recVerId = GetterUtil.getLong((String) workflowContext.get(WorkflowConstants.CONTEXT_ENTRY_CLASS_PK));
    final DDMFormInstanceRecordVersion recVer = DDMFormInstanceRecordVersionLocalServiceUtil.getFormInstanceRecordVersion(recVerId);
    final Locale locale = recVer.getDDMForm().getDefaultLocale();

    def titleMap = [:] as Map<Locale, String>;
    titleMap.put(locale, title)
    def descriptionMap = [:] as Map<Locale, String>;
    descriptionMap.put(locale, description)

    long[] newCategoryIds = new long[1]
    newCategoryIds[0] = GetterUtil.getLong(CategoryId);
    serviceContext.setAssetCategoryIds(newCategoryIds);

    //creating the article
    def article = JournalArticleLocalServiceUtil.addArticle(userId,groupId,folderId,titleMap,descriptionMap,content,ddmStructureKey,ddmTemplateKey,serviceContext)


    System.out.println(article);
    //adding article user tags
    JournalArticleLocalServiceUtil.updateAsset(userId , article, null , TagNamesGlobal.split(','),null,1.0);
}
def getValue(referanceId,value)
{
    switch (referanceId)
    {
        case "ScopeOfOperation":
            return mapFormDropDownToWebContentDropDown_ScopeOfOperation(value);
            break;
    }
    return value;
}
def printXML(document)
{
    // Use a Transformer to convert the Document to a String
    def transformerFactory = TransformerFactory.newInstance()
    def transformer = transformerFactory.newTransformer()
    def stringWriter = new StringWriter()
    def streamResult = new StreamResult(stringWriter)
    transformer.transform(new DOMSource(document), streamResult)
    def xmlString = stringWriter.toString()
    return xmlString;
}
def mapFormDropDownToWebContentDropDown_ScopeOfOperation(formValue)
{
    switch (formValue)
    {
        case '["Option45702415"]':
            return 'Option03496082';
        case '["Option52300980"]':
            return 'Option55280305';
        case '["Option74009307"]':
            return 'Option77074416';
    }
    return "[]"
}
def getType(referanceId)
{
    switch (referanceId)
    {
        case "DiscussionTitle" :case "FullName" :
            return "text";
        case "DescriptiveImage" : case "Documents":
            return "document_library";
        case "Proposal":
            return "rich_text";
        case "ScopeOfOperation":
            return "select";
        case "Location":
            return "geolocation";
    }
    return "text";
}
def getFieldName(referanceId)
{
    switch (referanceId)
    {
        case "DiscussionTitle":
            return "Text27378643";
        case "DescriptiveImage":
            return "Upload16018135";
        case "Proposal":
            return "RichText56687420";
        case "Documents":
            return "Upload59450160";
        case "ScopeOfOperation":
            return "SelectFromList61233767";
        case "FullName":
            return "Text63641168";
        case "Location":
            return "Geolocation50526995";
    }
}
def createLiferayValueNode(document,referanceId, name , language_id,value)
{
    element = document.createElement("dynamic-element");
    element.setAttribute("field-reference",referanceId);
    element.setAttribute("name",getFieldName(referanceId));
    element.setAttribute("type",getType(referanceId));
    valueElement = document.createElement("dynamic-content");
    valueElement.setAttribute("language-id",language_id);
    CDATA = document.createCDATASection(getValue(referanceId,value));
    valueElement.appendChild(CDATA);
    element.appendChild(valueElement);
    return element;
}
def normaliseValue(String value) {
    if (value == null || "".equals(value)) {
        return value;
    }
    return value.replaceAll("\\[\"", "").replaceAll("\"\\]", "");
}
// Create the DocumentBuilderFactory and DocumentBuilder
def factory = DocumentBuilderFactory.newInstance();
def builder = factory.newDocumentBuilder();
// Create the Document
def document = builder.newDocument();
// Create the root element
def rootElement = document.createElement("root");
//loop over fields and add elements to xml content document
JSONObject formValuesMap = JSONFactoryUtil.createJSONObject();
final long recVerId = GetterUtil.getLong((String) workflowContext.get(WorkflowConstants.CONTEXT_ENTRY_CLASS_PK));
final DDMFormInstanceRecordVersion recVer = DDMFormInstanceRecordVersionLocalServiceUtil.getFormInstanceRecordVersion(recVerId);
final Locale locale = recVer.getDDMForm().getDefaultLocale();
final List<DDMFormFieldValue> formFieldVals = recVer.getDDMFormValues().getDDMFormFieldValues();
for (DDMFormFieldValue fmval : formFieldVals) {
    final String fieldReference = fmval.getFieldReference();
    final Value val = fmval.getValue();
    final String data = normaliseValue(val.getString(Locale.ROOT));
    formValuesMap.put(fieldReference, data);
    if (fieldReference == "Tags")
    {
        TagNamesGlobal=val.getString(Locale.ROOT);
        continue;
    }
    if (fieldReference == "Category")
    {
        CategoryName =normaliseValue(val.getString(Locale.ROOT))
        CategoryId = getCategoryId(CategoryName,VocabularyId)
        continue;
    }
    rootElement.appendChild(createLiferayValueNode(document,fieldReference,fieldReference,"en_US",val.getString(Locale.ROOT)));
    workflowContext.put(fieldReference, data);
}

def dataStr = com.liferay.portal.kernel.json.JSONFactoryUtil.looseSerialize(formValuesMap)
workflowContext.put("data", dataStr);
workflowContext.put("recVerId", recVerId);
workflowContext.put("locale", locale);

// Add the root element to the Document
document.appendChild(rootElement);

createJournalArticle(creatorUserId,groupId,folderId,"test123 123 ","rest13 123 ",printXML(document),ddmStructureKey,ddmTemplateKey,serviceContext,TagNamesGlobal,CategoryId)





