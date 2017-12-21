//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2017.01.04 at 03:10:13 PM CST 
//


package Metadata.Specifications.DDI.LifeCycle.logicalproduct;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlType;

import Metadata.Specifications.DDI.LifeCycle.reusable.LabelType;
import Metadata.Specifications.DDI.LifeCycle.reusable.MaintainableType;
import Metadata.Specifications.DDI.LifeCycle.reusable.NameType;
import Metadata.Specifications.DDI.LifeCycle.reusable.ReferenceType;
import Metadata.Specifications.DDI.LifeCycle.reusable.SchemeReferenceType;
import Metadata.Specifications.DDI.LifeCycle.reusable.StructuredStringType;


/**
 * A scheme containing a set of Categories managed by an agency. These are used to manage category definitions used as a domain for data element and basic content for a category representations. In addition to the name, label, and description of the scheme, the structure supports the inclusion of another CategoryScheme by reference, a set of Category descriptions either in-line or by reference, and the description of a CategoryGroup either in-line or by reference.
 * <p>
 * <p>Java class for CategorySchemeType complex type.
 * <p>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;complexType name="CategorySchemeType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{ddi:reusable:3_2}MaintainableType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element ref="{ddi:logicalproduct:3_2}CategorySchemeName" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}Label" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}Description" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}CategorySchemeReference" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;choice maxOccurs="unbounded" minOccurs="0"&gt;
 *           &lt;element ref="{ddi:logicalproduct:3_2}Category"/&gt;
 *           &lt;element ref="{ddi:reusable:3_2}CategoryReference"/&gt;
 *         &lt;/choice&gt;
 *         &lt;choice maxOccurs="unbounded" minOccurs="0"&gt;
 *           &lt;element ref="{ddi:logicalproduct:3_2}CategoryGroup"/&gt;
 *           &lt;element ref="{ddi:logicalproduct:3_2}CategoryGroupReference"/&gt;
 *         &lt;/choice&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "CategorySchemeType", propOrder = {
        "categorySchemeName",
        "label",
        "description",
        "categorySchemeReference",
        "categoryOrCategoryReference",
        "categoryGroupOrCategoryGroupReference"
})
public class CategorySchemeType
        extends MaintainableType {

    @XmlElement(name = "CategorySchemeName")
    protected List<NameType> categorySchemeName;
    @XmlElement(name = "Label", namespace = "ddi:reusable:3_2")
    protected List<LabelType> label;
    @XmlElement(name = "Description", namespace = "ddi:reusable:3_2")
    protected StructuredStringType description;
    @XmlElement(name = "CategorySchemeReference", namespace = "ddi:reusable:3_2")
    protected List<SchemeReferenceType> categorySchemeReference;
    @XmlElements({
            @XmlElement(name = "Category", type = CategoryType.class),
            @XmlElement(name = "CategoryReference", namespace = "ddi:reusable:3_2", type = ReferenceType.class)
    })
    protected List<Object> categoryOrCategoryReference;
    @XmlElements({
            @XmlElement(name = "CategoryGroup", type = CategoryGroupType.class),
            @XmlElement(name = "CategoryGroupReference", type = ReferenceType.class)
    })
    protected List<Object> categoryGroupOrCategoryGroupReference;

    /**
     * A name for the scheme. May be expressed in multiple languages. Repeat the element to express names with different content, for example different names for different systems.Gets the value of the categorySchemeName property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the categorySchemeName property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCategorySchemeName().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link NameType }
     */
    public List<NameType> getCategorySchemeName() {
        if (categorySchemeName == null) {
            categorySchemeName = new ArrayList<NameType>();
        }
        return this.categorySchemeName;
    }

    /**
     * A display label for the scheme. May be expressed in multiple languages. Repeat for labels with different content, for example, labels with differing length limitations.Gets the value of the label property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the label property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getLabel().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link LabelType }
     */
    public List<LabelType> getLabel() {
        if (label == null) {
            label = new ArrayList<LabelType>();
        }
        return this.label;
    }

    /**
     * A description of the content and purpose of the scheme. May be expressed in multiple languages and supports the use of structured content.
     *
     * @return possible object is
     * {@link StructuredStringType }
     */
    public StructuredStringType getDescription() {
        return description;
    }

    /**
     * Sets the value of the description property.
     *
     * @param value allowed object is
     *              {@link StructuredStringType }
     */
    public void setDescription(StructuredStringType value) {
        this.description = value;
    }

    /**
     * Allows for inclusion by reference of other category schemes.Gets the value of the categorySchemeReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the categorySchemeReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCategorySchemeReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link SchemeReferenceType }
     */
    public List<SchemeReferenceType> getCategorySchemeReference() {
        if (categorySchemeReference == null) {
            categorySchemeReference = new ArrayList<SchemeReferenceType>();
        }
        return this.categorySchemeReference;
    }

    /**
     * Gets the value of the categoryOrCategoryReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the categoryOrCategoryReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCategoryOrCategoryReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CategoryType }
     * {@link ReferenceType }
     */
    public List<Object> getCategoryOrCategoryReference() {
        if (categoryOrCategoryReference == null) {
            categoryOrCategoryReference = new ArrayList<Object>();
        }
        return this.categoryOrCategoryReference;
    }

    /**
     * Gets the value of the categoryGroupOrCategoryGroupReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the categoryGroupOrCategoryGroupReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCategoryGroupOrCategoryGroupReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CategoryGroupType }
     * {@link ReferenceType }
     */
    public List<Object> getCategoryGroupOrCategoryGroupReference() {
        if (categoryGroupOrCategoryGroupReference == null) {
            categoryGroupOrCategoryGroupReference = new ArrayList<Object>();
        }
        return this.categoryGroupOrCategoryGroupReference;
    }

}