//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2017.01.04 at 03:10:13 PM CST 
//


package Metadata.Specifications.DDI.LifeCycle.datacollection;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlType;

import Metadata.Specifications.DDI.LifeCycle.reusable.BindingType;
import Metadata.Specifications.DDI.LifeCycle.reusable.InParameterType;
import Metadata.Specifications.DDI.LifeCycle.reusable.NameType;
import Metadata.Specifications.DDI.LifeCycle.reusable.OtherMaterialType;
import Metadata.Specifications.DDI.LifeCycle.reusable.ParameterType;
import Metadata.Specifications.DDI.LifeCycle.reusable.ReferenceType;
import Metadata.Specifications.DDI.LifeCycle.reusable.RepresentationType;
import Metadata.Specifications.DDI.LifeCycle.reusable.ResponseCardinalityType;
import Metadata.Specifications.DDI.LifeCycle.reusable.StructuredStringType;
import Metadata.Specifications.DDI.LifeCycle.reusable.TextDomainType;
import Metadata.Specifications.DDI.LifeCycle.reusable.VersionableType;


/**
 * Structure a single Question which may contain one or more response domains (i.e., a list of valid category responses where if "Other" is indicated a text response can be used to specify the intent of "Other"). The structure provides detail on the intent of the question, the text of the question, the valid response options and the number of allowed responses, references to external aids and instructions, and an estimation of the time needed to respond to the question. Note that the QuestionItem is a reusable format for use in any number of applied uses. External aids, instructions, response sequencing etc. should contain information consistent with the general use of the QuestionItem. Additional materials and information can be added within the QuestionConstruct which is the applied use of a question.
 * <p>
 * <p>Java class for QuestionItemType complex type.
 * <p>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;complexType name="QuestionItemType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{ddi:reusable:3_2}VersionableType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}QuestionItemName" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}InParameter" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}OutParameter" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}Binding" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}QuestionText" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}QuestionIntent" minOccurs="0"/&gt;
 *         &lt;choice minOccurs="0"&gt;
 *           &lt;choice minOccurs="0"&gt;
 *             &lt;element ref="{ddi:datacollection:3_2}ResponseDomain"/&gt;
 *             &lt;element ref="{ddi:datacollection:3_2}ResponseDomainReference"/&gt;
 *           &lt;/choice&gt;
 *           &lt;element ref="{ddi:datacollection:3_2}StructuredMixedResponseDomain"/&gt;
 *         &lt;/choice&gt;
 *         &lt;element ref="{ddi:reusable:3_2}ResponseCardinality" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}ConceptReference" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}ExternalAid" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;choice maxOccurs="unbounded" minOccurs="0"&gt;
 *           &lt;element ref="{ddi:datacollection:3_2}ExternalInterviewerInstruction"/&gt;
 *           &lt;element ref="{ddi:datacollection:3_2}InterviewerInstructionReference"/&gt;
 *         &lt;/choice&gt;
 *       &lt;/sequence&gt;
 *       &lt;attribute name="estimatedSecondsResponseTime" type="{http://www.w3.org/2001/XMLSchema}decimal" /&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "QuestionItemType", propOrder = {
        "questionItemName",
        "inParameter",
        "outParameter",
        "binding",
        "questionText",
        "questionIntent",
        "responseDomain",
        "responseDomainReference",
        "structuredMixedResponseDomain",
        "responseCardinality",
        "conceptReference",
        "externalAid",
        "externalInterviewerInstructionOrInterviewerInstructionReference"
})
public class QuestionItemType
        extends VersionableType {

    @XmlElement(name = "QuestionItemName")
    protected List<NameType> questionItemName;
    @XmlElement(name = "InParameter", namespace = "ddi:reusable:3_2")
    protected List<InParameterType> inParameter;
    @XmlElement(name = "OutParameter", namespace = "ddi:reusable:3_2")
    protected List<ParameterType> outParameter;
    @XmlElement(name = "Binding", namespace = "ddi:reusable:3_2")
    protected List<BindingType> binding;
    @XmlElement(name = "QuestionText")
    protected List<DynamicTextType> questionText;
    @XmlElement(name = "QuestionIntent")
    protected StructuredStringType questionIntent;
    @XmlElementRef(name = "ResponseDomain", namespace = "ddi:datacollection:3_2", type = JAXBElement.class, required = false)
    protected JAXBElement<? extends RepresentationType> responseDomain;
    @XmlElementRef(name = "ResponseDomainReference", namespace = "ddi:datacollection:3_2", type = JAXBElement.class, required = false)
    protected JAXBElement<DomainReferenceType> responseDomainReference;
    @XmlElement(name = "StructuredMixedResponseDomain")
    protected StructuredMixedResponseDomainType structuredMixedResponseDomain;
    @XmlElement(name = "ResponseCardinality", namespace = "ddi:reusable:3_2")
    protected ResponseCardinalityType responseCardinality;
    @XmlElement(name = "ConceptReference", namespace = "ddi:reusable:3_2")
    protected List<ReferenceType> conceptReference;
    @XmlElement(name = "ExternalAid")
    protected List<OtherMaterialType> externalAid;
    @XmlElements({
            @XmlElement(name = "ExternalInterviewerInstruction", type = ExternalInterviewerInstructionType.class),
            @XmlElement(name = "InterviewerInstructionReference", type = InterviewerInstructionReferenceType.class)
    })
    protected List<Object> externalInterviewerInstructionOrInterviewerInstructionReference;
    @XmlAttribute(name = "estimatedSecondsResponseTime")
    protected BigDecimal estimatedSecondsResponseTime;

    /**
     * A name for the QuestionItem. May be expressed in multiple languages. Repeat the element to express names with different content, for example different names for different systems.Gets the value of the questionItemName property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the questionItemName property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getQuestionItemName().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link NameType }
     */
    public List<NameType> getQuestionItemName() {
        if (questionItemName == null) {
            questionItemName = new ArrayList<NameType>();
        }
        return this.questionItemName;
    }

    /**
     * Provides an identity for input objects required for the QuestionItem.Gets the value of the inParameter property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the inParameter property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getInParameter().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link InParameterType }
     */
    public List<InParameterType> getInParameter() {
        if (inParameter == null) {
            inParameter = new ArrayList<InParameterType>();
        }
        return this.inParameter;
    }

    /**
     * Provides an identify for the output objects of the QuestionItem.Gets the value of the outParameter property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the outParameter property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getOutParameter().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ParameterType }
     */
    public List<ParameterType> getOutParameter() {
        if (outParameter == null) {
            outParameter = new ArrayList<ParameterType>();
        }
        return this.outParameter;
    }

    /**
     * A structure used to bind the content of a parameter declared as the source to a parameter declared as the target. For example, binding the OutParameter of one Question to the InParameter of another Question in order to personalize a question text. Care should be taken to bind only reusable information at this level. Binding is also available at the QuestionConstruct to reflect bindings particular to the use of the question in a specific question flow or instrument.Gets the value of the binding property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the binding property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getBinding().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link BindingType }
     */
    public List<BindingType> getBinding() {
        if (binding == null) {
            binding = new ArrayList<BindingType>();
        }
        return this.binding;
    }

    /**
     * The text of a question. Supports the use of DynamicText. Note that when using QuestionText, the full QuestionText must be repeated for multi-language versions of the content. Different languages may handle the dynamic portions in different locations and/or with different content. Therefore languages cannot be mixed within a dynamic text except when the full text itself has multiple language sections, for example, a foreign language term in a text. The DisplayText may also be repeated to provide a dynamic and plain text version of the display. This allows for accurate rendering of the QuestionText in a non-dynamic environment like print.Gets the value of the questionText property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the questionText property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getQuestionText().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link DynamicTextType }
     */
    public List<DynamicTextType> getQuestionText() {
        if (questionText == null) {
            questionText = new ArrayList<DynamicTextType>();
        }
        return this.questionText;
    }

    /**
     * The purpose of the QuestionItem in terms of what it is designed to measure.
     *
     * @return possible object is
     * {@link StructuredStringType }
     */
    public StructuredStringType getQuestionIntent() {
        return questionIntent;
    }

    /**
     * Sets the value of the questionIntent property.
     *
     * @param value allowed object is
     *              {@link StructuredStringType }
     */
    public void setQuestionIntent(StructuredStringType value) {
        this.questionIntent = value;
    }

    /**
     * Contains a response domain for the question item. Typically used to describe simple response domains (textual, numeric, etc.).
     *
     * @return possible object is
     * {@link JAXBElement }{@code <}{@link CodeDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link DateTimeDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link ScaleDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link GeographicDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link GeographicStructureCodeDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link RepresentationType }{@code >}
     * {@link JAXBElement }{@code <}{@link CategoryDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link DistributionDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link GeographicLocationCodeDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link LocationDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link NumericDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link RankingDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link NominalDomainType }{@code >}
     * {@link JAXBElement }{@code <}{@link TextDomainType }{@code >}
     */
    public JAXBElement<? extends RepresentationType> getResponseDomain() {
        return responseDomain;
    }

    /**
     * Sets the value of the responseDomain property.
     *
     * @param value allowed object is
     *              {@link JAXBElement }{@code <}{@link CodeDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link DateTimeDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link ScaleDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link GeographicDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link GeographicStructureCodeDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link RepresentationType }{@code >}
     *              {@link JAXBElement }{@code <}{@link CategoryDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link DistributionDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link GeographicLocationCodeDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link LocationDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link NumericDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link RankingDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link NominalDomainType }{@code >}
     *              {@link JAXBElement }{@code <}{@link TextDomainType }{@code >}
     */
    public void setResponseDomain(JAXBElement<? extends RepresentationType> value) {
        this.responseDomain = value;
    }

    /**
     * The inclusion of a response domain by reference (must be supported by a managed representation). An abstract element. May be substituted by any valid object of substitution type ResponseDomainReference.
     *
     * @return possible object is
     * {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     * {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     * {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     * {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     * {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     * {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     */
    public JAXBElement<DomainReferenceType> getResponseDomainReference() {
        return responseDomainReference;
    }

    /**
     * Sets the value of the responseDomainReference property.
     *
     * @param value allowed object is
     *              {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     *              {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     *              {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     *              {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     *              {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     *              {@link JAXBElement }{@code <}{@link DomainReferenceType }{@code >}
     */
    public void setResponseDomainReference(JAXBElement<DomainReferenceType> value) {
        this.responseDomainReference = value;
    }

    /**
     * Use in cases where the question requires the option for multiple response domains, such as a category response and a text response to specify a value for "Other", or when text needs to be inserted before, after, or between response options for the question.
     *
     * @return possible object is
     * {@link StructuredMixedResponseDomainType }
     */
    public StructuredMixedResponseDomainType getStructuredMixedResponseDomain() {
        return structuredMixedResponseDomain;
    }

    /**
     * Sets the value of the structuredMixedResponseDomain property.
     *
     * @param value allowed object is
     *              {@link StructuredMixedResponseDomainType }
     */
    public void setStructuredMixedResponseDomain(StructuredMixedResponseDomainType value) {
        this.structuredMixedResponseDomain = value;
    }

    /**
     * Allows the designation of the minimum and maximum number of responses allowed for this question. Note that each response domain has its own response cardinality.
     *
     * @return possible object is
     * {@link ResponseCardinalityType }
     */
    public ResponseCardinalityType getResponseCardinality() {
        return responseCardinality;
    }

    /**
     * Sets the value of the responseCardinality property.
     *
     * @param value allowed object is
     *              {@link ResponseCardinalityType }
     */
    public void setResponseCardinality(ResponseCardinalityType value) {
        this.responseCardinality = value;
    }

    /**
     * A reference to the concept associated with the response to the question.Gets the value of the conceptReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the conceptReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getConceptReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ReferenceType }
     */
    public List<ReferenceType> getConceptReference() {
        if (conceptReference == null) {
            conceptReference = new ArrayList<ReferenceType>();
        }
        return this.conceptReference;
    }

    /**
     * A pointer to an external aid presented by the instrument such as a text card, image, audio, or audiovisual aid. Typically a URN. Use type attribute to describe the type of external aid provided. Example of terms to use would include: imageOnly audioOnly audioVisual multiMedia.Gets the value of the externalAid property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the externalAid property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getExternalAid().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link OtherMaterialType }
     */
    public List<OtherMaterialType> getExternalAid() {
        if (externalAid == null) {
            externalAid = new ArrayList<OtherMaterialType>();
        }
        return this.externalAid;
    }

    /**
     * Gets the value of the externalInterviewerInstructionOrInterviewerInstructionReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the externalInterviewerInstructionOrInterviewerInstructionReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getExternalInterviewerInstructionOrInterviewerInstructionReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ExternalInterviewerInstructionType }
     * {@link InterviewerInstructionReferenceType }
     */
    public List<Object> getExternalInterviewerInstructionOrInterviewerInstructionReference() {
        if (externalInterviewerInstructionOrInterviewerInstructionReference == null) {
            externalInterviewerInstructionOrInterviewerInstructionReference = new ArrayList<Object>();
        }
        return this.externalInterviewerInstructionOrInterviewerInstructionReference;
    }

    /**
     * Gets the value of the estimatedSecondsResponseTime property.
     *
     * @return possible object is
     * {@link BigDecimal }
     */
    public BigDecimal getEstimatedSecondsResponseTime() {
        return estimatedSecondsResponseTime;
    }

    /**
     * Sets the value of the estimatedSecondsResponseTime property.
     *
     * @param value allowed object is
     *              {@link BigDecimal }
     */
    public void setEstimatedSecondsResponseTime(BigDecimal value) {
        this.estimatedSecondsResponseTime = value;
    }

}